# Backend

The Express API provides JSON authentication endpoints backed by PostgreSQL and Prisma.

## Configuration

Set these variables in `backend/.env` (do not commit that file):

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: a private random secret of at least 32 bytes.
- `FRONTEND_ORIGIN`: allowed browser origin; defaults to `http://localhost:3000`.
- `PORT`: API port; defaults to `4000`.

Install dependencies, generate Prisma Client, and apply the database migration:

```sh
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

For deployment, run `npm run db:deploy` before starting the server.

## Authentication API

- `POST /api/auth/register` accepts `{ "name", "email", "password" }`, creates an account, and returns `201` with `{ "user", "token" }`.
- `POST /api/auth/login` accepts `{ "email", "password" }` and returns `200` with `{ "user", "token" }`.

The returned one-hour JWT is intended for bearer authentication on protected API routes. Passwords are stored as bcrypt hashes and never included in responses.
