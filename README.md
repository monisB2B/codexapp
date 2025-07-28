# Simple Inventory Tracker

## Setup

```bash
npm install
cd server && npx prisma migrate dev --name init && npm run seed
```

## Run locally

```bash
# in one terminal (uses ts-node-dev to auto-reload TypeScript)
npm run dev --workspace=server
# in another
npm run dev --workspace=client
```

## Tests

```bash
npm test
```
