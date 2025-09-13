# Flex Business Solutions - Inventory Management System

This is a Next.js application built for the Flex Business Solutions tech test. It's an inventory management system that allows users to manage job sites and their corresponding inventory items across different categories.

## Features

- **Job Site Management**: Create and manage job sites with different statuses
- **Inventory Dashboard**: View and manage inventory items for each job site
- **Category-based Organization**: Organize items into categories
- **Search & Filter**: Search through job sites and inventory items
- **Real-time Updates**: Update items with inline editing capabilities
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **UI Components**: Radix UI primitives with Tailwind CSS
- **State Management**: TanStack Query for client side queries
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest with React Testing Library
- **TypeScript**: Full type safety throughout the application

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- Supabase account and project
- Environment variables configured (see Environment Setup below)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Environment Setup

The .env is already committed to the repo for demo purposes.
Feel free to update the environment variables if you need to connect to a different Supabase project.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Live Demo

The application is deployed and available at: **[react-interview-task-nine.vercel.app](https://react-interview-task-nine.vercel.app)**

You can explore the live application to see all features in action without setting up the development environment.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run test` - Run the test suite
- `npm run ts:check` - Run TypeScript type checking
- `npm run db:introspect` - Introspect the database schema

## Project Structure

```
src/
├── actions/         # Server actions for data operations
├── app/             # Next.js app router pages
├── components/      # Reusable UI components
├── db/              # Database schema and configuration
├── lib/             # Utility functions
└── providers/       # React context providers
```

## Testing

The application includes unit tests. Run the test suite with:

```bash
npm run test
```
