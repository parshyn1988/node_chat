import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt, timingSafeEqual, ScryptOptions } from 'node:crypto';

const N = 2 ** 17;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const MAX_MEMORY = 256 * 1024 * 1024;

function scryptAsync(
  password: string,
  salt: Buffer,
  keyLength: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (err, key) => {
      err ? reject(err) : resolve(key)
    })
  })
}

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);
    const key = await scryptAsync(password, salt, KEY_LENGTH, { N, r, p, maxmem: MAX_MEMORY });

    return ['scrypt', N, r, p, salt.toString('base64'), key.toString('base64')].join('$');
  }

  async verify(password: string, stored: string): Promise<boolean> {
    const [algorythm, n, blockSize, parallel, saltB64, keyB64,] = stored.split('$');
    if (algorythm != 'scrypt' || !saltB64 || !keyB64) {
      return false;
    }

    const expected = Buffer.from(keyB64, 'base64');
    const actual = await scryptAsync(password, Buffer. from(saltB64, 'base64'), expected.length, {
      N: Number(n),
      r: Number(blockSize),
      p: Number(parallel),
      maxmem: MAX_MEMORY,
    })

    return timingSafeEqual(actual, expected);
  }
}


