# Simple Inventory Tracker

## Setup

```bash
npm install
cd server && npx prisma migrate dev --name init && npm run seed
```

## Development

```bash
# in one terminal
npm run dev --workspace=server
# in another
npm run dev --workspace=client
```

## Tests

```bash
npm test
```
