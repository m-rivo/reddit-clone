# Reddit Clone

This is a Reddit clone developed with **Next.js 16 (React)**, **TypeScript**, **Tailwind CSS**, **Shadcn/ui components** and **PocketBase 0.36.5** as a Backend-as-a-Service.

---

## Requirements

Before you begin, ensure you have [Node.js](https://nodejs.org/en/download) installed.

---

## Instalation & Setup

### 1. Backend (PocketBase)
1. Download the PocketBase executable for your operating system from the [PocketBase Documentation](https://pocketbase.io/docs/).
2. Place the pocketbase executable in the project root.
3. Start the server with automatic migrations enabled:

   ```bash
   ./pocketbase serve --automigrate
   ```
4. The first time it will generate an installer link that should be automatically opened in the browser to set up your first superuser account.

### 2. Local Email (MailHog)
To intercept verification emails without using a real SMTP provider:

1. Download the MailHog binary for your OS from the [MailHog v1.0.0 Releases](https://github.com/mailhog/MailHog/releases/v1.0.0).
2. Run the executable. It will start the SMTP server on port 1025 and the [Web UI on port 8025](http://localhost:8025).

### 3. Email & Auth Configuration
To ensure the user verification and password reset flows work correctly:

1. Log in to the PocketBase Admin UI http://localhost:8090/_/.
2. Go to Settings > Application:
     * Set Application URL to http://localhost:3000.
3. Go to Settings > Mail Settings:
     * Enable Use SMTP mail server:
       * Host: localhost
       * Port: 1025
       * Leave Username and Password empty
4. All outgoing emails will be intercepted and visible in the MailHog Web UI http://localhost:8025.

### 4. Frontend (Next.js)
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



## Project Structure
* src/app: Routes and layouts.
* src/lib: PocketBase configuration, Zod validation schemas and utilities.
* backend/pb_migrations: Database schema history (synchronizes collections and rules across environments).
* src/components: UI components (powered by Shadcn/UI).

