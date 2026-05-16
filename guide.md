# NQ Forge Deployment Guide

This guide covers everything you need to know to deploy NQ Forge to the internet, attach a custom domain, and understand what accounts or purchases are required.

## 1. Can I deploy this on GitHub Pages?

**Short Answer:** Not recommended for this specific project.

**Long Answer:** GitHub Pages is designed strictly for **static websites** (HTML, CSS, static JS). 
NQ Forge is built with Next.js using a **Full-Stack Architecture**. It includes backend API routes (e.g., `/api/v1/...`) and depends on server-side processing for features like Rate Limiting and secure endpoints. 

If you force a static export to GitHub Pages, your UI will load, but **all of your API routes, authentication, and server-side features will completely break and return 404 errors.**

### The Recommended Alternative: Vercel (Free)
Because Next.js was created by Vercel, Vercel is the absolute best place to host this app. It supports all Next.js server features natively, and their **Hobby tier is 100% free forever**.

---

## 2. Required Accounts & Costs

To deploy the platform fully, you will need the following accounts. **Everything can be done on free tiers except for the custom domain.**

### Required Accounts (All Free)
1. **GitHub:** To host your code repository.
2. **Vercel:** To host and deploy the live website and APIs.
3. **Supabase (If using Auth/DB):** Free tier for user logins and database.
4. **Upstash (If using Rate Limiting):** Free tier for Redis to prevent API abuse.

### Required Purchases
1. **Custom Domain Name (~$10-$20 / year):**
   - You need to buy your custom domain (e.g., `nqforge.com`).
   - Recommended registrars: **Cloudflare** (cheapest renewals), **Namecheap**, or you can buy it directly inside **Vercel**.

---

## 3. Step-by-Step Deployment Guide

### Step 1: Push your code to GitHub
1. Create a free account on [GitHub](https://github.com).
2. Create a new repository (e.g., `nq-forge`).
3. In your terminal, link your local project to GitHub and push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nq-forge.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Create a free account on [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New Project"**.
3. Select the `nq-forge` repository you just pushed to GitHub.
4. Vercel will automatically detect that it is a Next.js project.
5. **Environment Variables:** Before clicking Deploy, open the "Environment Variables" dropdown. You need to add the variables from your `.env.example` file (like Supabase URLs and Upstash Redis tokens). 
6. Click **Deploy**. Vercel will build and launch your site on a free `.vercel.app` subdomain.

### Step 3: Set up your Custom Domain
Once your site is successfully deployed on Vercel:
1. Go to your project dashboard on Vercel.
2. Click on the **Settings** tab, then select **Domains** from the left sidebar.
3. Enter the custom domain you purchased (e.g., `nqforge.com`) and click **Add**.
4. Vercel will give you a set of **DNS Records** (usually an `A Record` pointing to `76.76.21.21` or a `CNAME`).
5. Log into the website where you bought your domain (Namecheap, GoDaddy, etc.).
6. Go to the DNS settings for your domain and paste the records Vercel gave you.
7. Wait a few minutes (up to an hour) for the internet to update. Vercel will automatically generate a free SSL (HTTPS) certificate for you.

---

## 4. Monetization & Future Steps

- **Google AdSense:** Since the layout is already built with AdSense placeholders, you will need to create a free Google AdSense account. Once your custom domain is live, submit the site to Google. They will review it, and once approved, you can place your AdSense publisher ID in the environment variables.
- **Continuous Deployment:** Every time you run `git push origin main` in the future, Vercel will automatically detect the changes and deploy the new version of your website within minutes.

---

## 5. How the GitHub -> Vercel Pipeline Works

When you push code to GitHub, how does Vercel know about it and deploy it automatically? This is done through a mechanism called **Webhooks** and an automated **CI/CD Pipeline** (Continuous Integration / Continuous Deployment).

Here is the exact step-by-step of what happens under the hood:

1. **The Webhook Trigger:** When you create a project in Vercel and connect your GitHub repository, Vercel automatically installs a "GitHub App" or creates a "Webhook" on your GitHub repository.
2. **You Push Code:** You finish making changes to your code locally and type `git push origin main` in your terminal.
3. **GitHub Sends a Signal:** The moment GitHub receives your new code, it immediately fires the webhook, sending an HTTP payload (a notification) to Vercel's servers saying: *"Hey Vercel, the user just pushed a new commit to the main branch!"*
4. **Vercel Spins up a Server:** Vercel receives this notification and instantly spins up a temporary virtual machine (a build container) just for you.
5. **The Build Process:** 
   - Vercel clones your newest code from GitHub into that temporary machine.
   - It runs `npm install` to download all your project's dependencies.
   - It runs `npm run build` to compile your Next.js application, optimize the images, and minify the code for production.
6. **Deployment to the Edge:** Once the build is successfully completed, Vercel takes the compiled application and distributes it across its Global Edge Network (CDNs all over the world). 
7. **Go Live:** Your custom domain is instantly routed to this newly built version of the site. This happens with "Zero Downtime", meaning your users never see an offline page while the new version is being deployed.

All of this happens automatically in about 1-3 minutes without you ever needing to touch a server!
