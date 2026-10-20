# Chat DB

## Database schema

```
.
├── compose.yaml
├── db/
│   └── init/
│       └── 01_tables.sql   # schema: users, chats, chat_members, chat_history
└── README.md
```
## Run
```bash
docker compose up -d         # start Postgres in the background
docker compose logs postgres # check that init scripts ran successfully
```

## Container and Data Management
```bash
docker compose down     # container removed, data in pgdata volume is kept
docker compose down -v  # also removes the volume — DB is empty, init scripts run again
docker volume ls        # list Docker volumes
```
