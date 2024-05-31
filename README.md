# Next.js Prisma CRUD
This project is an example of a basic CRUD application using [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Requirements
- Node.js (version 20.12.0)
- npm (Node.js package manager)

## Getting Started
1. Clone the repository:
```sh
git clone <REPOSITORY_URL>
cd nextjs-prisma-crud
```

2. Install the project dependencies:

```bash
npm install
```

## Usage
Start the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration
1. Create a .env file in the root of the project with the following content:
```bash
DATABASE_URL="file:./dev.db"
```

2. Run Prisma migrations to set up the SQLite database:
```bash
npx prisma migrate dev --name init
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
