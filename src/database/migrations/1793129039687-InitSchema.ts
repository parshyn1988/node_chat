import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1793129039687 implements MigrationInterface {
    name = 'InitSchema1793129039687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chats" ("id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL, "email" character varying(255) NOT NULL, "user_name" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_members" ("chat_id" bigint NOT NULL, "user_id" bigint NOT NULL, "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b4a04a57c87d984b806c95eac6d" PRIMARY KEY ("chat_id", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL, "chat_id" bigint NOT NULL, "sender_id" bigint, "body" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "edited_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_members" ADD CONSTRAINT "FK_29ffb4b6edf59a7862129765339" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_members" ADD CONSTRAINT "FK_9dc61e92eed1dc151c2b2ef01a0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_7540635fef1922f0b156b9ef74f" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_7540635fef1922f0b156b9ef74f"`);
        await queryRunner.query(`ALTER TABLE "chat_members" DROP CONSTRAINT "FK_9dc61e92eed1dc151c2b2ef01a0"`);
        await queryRunner.query(`ALTER TABLE "chat_members" DROP CONSTRAINT "FK_29ffb4b6edf59a7862129765339"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "chat_members"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "chats"`);
    }

}
