# Reddit Clone

This is a Reddit clone developed with **Next.js 16 (App Router)**, **TypeScript**, **Shadcn/ui components** and **PocketBase 0.36.5** as a Backend-as-a-Service.

---

## Requirements

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/download)
* [Docker and Docker Compose](https://www.docker.com/get-started/)

---

## Instalation & Setup

### 1. Backend (PocketBase & MailHog)
Run the following command in the root directory to start the backend services:

   ```bash
   docker compose up -d
   ```
* PocketBase Admin UI: http://127.0.0.1:8090/_/
* MailHog Web UI (Local emails): http://localhost:8025

### 3. Frontend (Next.js)
Run the following commands in the root directory to start the frontend:
1. Install dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run dev
```
3. Open http://localhost:3000 in your browser.

## Email & Auth Configuration
To ensure the user verification and password reset flows work correctly:

1. Log in to the PocketBase Admin UI http://127.0.0.1:8090/_/.
2. Go to Settings > Application:
     * Set Application URL to http://localhost:3000.
3. Go to Settings > Mail Settings:
     * Enable Use SMTP mail server:
       * Host: localhost
       * Port: 1025
       * Leave Username and Password empty
4. All outgoing emails will be intercepted and visible in the MailHog Web UI http://localhost:8025.

## Project Structure
* src/app: Routes and layouts.
* src/lib: PocketBase configuration, Zod validation schemas and utilities.
* backend/pb_migrations: Database schema history (synchronizes collections and rules across environments).
* src/components: UI components (powered by Shadcn/UI).

