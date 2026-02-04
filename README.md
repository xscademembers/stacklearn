# Stack Learn - Study Abroad Website

A comprehensive Next.js 14 application for study abroad services, built with TypeScript, Tailwind CSS, and React.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment to Vercel

### Automatic Deployment (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies (`npm install`)
     - Build the project (`npm run build`)
     - Deploy to production

### Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files excluded from deployment
- `next.config.js` - Next.js configuration with image optimization
- `.npmrc` - npm configuration for dependency resolution

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── destinations/      # Study destinations pages
│   ├── services/          # Services pages
│   └── ...                # Other pages
├── components/            # React components
│   ├── home/              # Home page components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer component
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## ✅ Production Checklist

- [x] All images use Next.js Image component
- [x] API routes have error handling
- [x] TypeScript strict mode enabled
- [x] ESLint configured
- [x] Image optimization configured
- [x] Vercel deployment config added
- [x] Dependency versions aligned

## 📝 Environment Variables (Optional)

If you need environment variables, add them in Vercel Dashboard:
- Settings → Environment Variables

Example:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🐛 Troubleshooting

### Build Errors

1. **Dependency conflicts:** Run `npm install` after pulling latest changes
2. **TypeScript errors:** Run `npm run build` locally to check
3. **Image errors:** Check `next.config.js` remotePatterns configuration

### Deployment Issues

1. Check Vercel build logs for specific errors
2. Ensure `package.json` has correct build scripts
3. Verify Node.js version in Vercel (should be 18+)

## 📄 License

Private - Stack Learn © 2025
