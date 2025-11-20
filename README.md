Latz Web Design – Project Starter

This repo is the base template I use for new client projects at Latz Web Design.
It’s built to create fast, mobile-first, conversion-focused websites that are easy to maintain and scale.

Under the hood, it uses a modern Jamstack setup with Next.js, React, and Tailwind CSS, and is optimized for deployment on Vercel.

Tech Stack

Next.js (App Router) – Server components, routing, and API routes

React – UI components

Tailwind CSS – Utility-first styling

Framer Motion – Smooth, modern animations (where needed)

Vercel – Hosting, deployments, and analytics

next/font / Geist – Optimized fonts out of the box

Some projects may also include a Sanity CMS setup for client editing and structured content. When that’s the case, there will be a /sanity folder and its own small README.

Getting Started

Install dependencies

npm install
# or
pnpm install
# or
yarn install


Set up environment variables

Create a .env.local file in the project root.

Copy from .env.example if present, and fill in any required keys (API keys, project IDs, etc.).

Run the development server

npm run dev
# or
pnpm dev
# or
yarn dev


Open the site

Visit http://localhost:3000
 in your browser.

Project Structure

High-level layout (may vary slightly per project):

app/ – App Router pages, layouts, and route handlers

components/ – Reusable UI components

lib/ – Utilities, helpers, and config

public/ – Static assets (images, icons, etc.)

styles/ – Tailwind config and global styles

sanity/ (optional) – Sanity schemas, config, and studio setup

The homepage usually lives at:

app/page.tsx   or   app/page.js

Common Scripts
npm run dev       # Start the local dev server
npm run build     # Create an optimized production build
npm run start     # Run the production server (after build)
npm run lint      # Run linting


(Use yarn or pnpm equivalents if that’s your package manager of choice.)

Deployment

This starter is set up to deploy smoothly on Vercel:

Connect the repository to Vercel.

Add the same environment variables from .env.local into the project settings on Vercel.

Push to the main branch (or your selected production branch) to trigger a deploy.

For more details, see Vercel’s docs on deploying Next.js apps.

Notes for Collaborators / Future Devs

The goal of this setup is to keep things lean, fast, and maintainable—no bloated plugins or heavy page builders.

Animations and interactions should support the content and conversion goals, not distract from them.

If you’re adding new sections or pages, keep the existing component structure, naming, and Tailwind utility patterns consistent.

If you’re jumping into this project and have questions about structure or conventions, treat this README as your starting map and build from there.