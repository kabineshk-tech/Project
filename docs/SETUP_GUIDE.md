# Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Development Setup](#development-setup)
4. [Project Scripts](#project-scripts)
5. [Environment Configuration](#environment-configuration)
6. [IDE Setup](#ide-setup)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)

---

## Prerequisites

### Required Software

#### 1. Node.js
- **Version**: 20.x or higher
- **Download**: [https://nodejs.org/](https://nodejs.org/)
- **Verify Installation**:
  ```bash
  node --version
  # Should output: v20.x.x or higher
  ```

#### 2. npm (comes with Node.js)
- **Version**: 10.x or higher
- **Verify Installation**:
  ```bash
  npm --version
  # Should output: 10.x.x or higher
  ```

#### 3. Git
- **Version**: Any recent version
- **Download**: [https://git-scm.com/](https://git-scm.com/)
- **Verify Installation**:
  ```bash
  git --version
  # Should output: git version 2.x.x
  ```

### Recommended Software

#### Code Editor
- **Visual Studio Code** (Recommended)
  - Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)
  - Reason: Best TypeScript and React support

- **Alternative Options**:
  - WebStorm
  - Sublime Text
  - Vim/Neovim with LSP

#### Browser
- **Chrome** or **Firefox** (Latest version)
- **React Developer Tools** extension
- **Redux DevTools** extension (for future state management)

---

## Installation

### Step 1: Clone the Repository

```bash
# If using Git
cd /path/to/your/projects
git clone <repository-url>
cd my-app

# Or if you already have the folder
cd "/home/kabinesh-k/Documents/react learning/my-app"
```

### Step 2: Install Dependencies

```bash
npm install
```

**What this does**:
- Installs all dependencies from `package.json`
- Creates `node_modules` folder
- Generates `package-lock.json` (if not present)
- Downloads Next.js, React, TypeScript, Tailwind CSS, etc.

**Expected Output**:
```
added 291 packages in 30s
```

**Common Issues**:
- **npm ERR! EACCES**: Permission error
  - Solution: Don't use `sudo`. Fix npm permissions: [https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

- **npm ERR! ERESOLVE**: Dependency conflict
  - Solution: Try `npm install --legacy-peer-deps`

### Step 3: Verify Installation

```bash
# Check if node_modules exists
ls node_modules

# Check if key dependencies are installed
npm list next react typescript
```

---

## Development Setup

### Start Development Server

```bash
npm run dev
```

**What this does**:
- Starts Next.js development server
- Enables Hot Module Replacement (HMR)
- Watches for file changes
- Compiles TypeScript on the fly
- Opens at `http://localhost:3000`

**Expected Output**:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Starting...
 ✓ Ready in 2.5s
```

### Open in Browser

1. Open your browser
2. Navigate to: `http://localhost:3000`
3. You should see the homepage with animated course cards

### Test Navigation

- **Homepage**: `http://localhost:3000` or `http://localhost:3000/home`
- **Registration**: `http://localhost:3000/registerform`

### Hot Reload Testing

1. Open `components/home/HomePage.tsx`
2. Change some text (e.g., "Master Frontend Development" to "Learn Frontend Development")
3. Save the file
4. Browser should automatically refresh showing your changes

---

## Project Scripts

### Available Scripts

#### Development
```bash
npm run dev
```
- Starts development server
- Port: 3000 (default)
- Hot reload enabled
- Source maps enabled
- Unminified code

#### Build for Production
```bash
npm run build
```
- Creates optimized production build
- Output: `.next` folder
- Minifies JavaScript and CSS
- Generates static pages
- Type-checks TypeScript
- Shows build errors and warnings

**Expected Output**:
```
Route (app)                Size     First Load JS
┌ ○ /                      145 B          95.2 kB
├ ○ /home                  145 B          95.2 kB
└ ○ /registerform          2.1 kB         97.3 kB
+ First Load JS shared by all  95 kB
  ├ chunks/framework-xxx.js    45.2 kB
  ├ chunks/main-app-xxx.js     25.3 kB
  └ other shared chunks        24.5 kB

○  (Static)  prerendered as static content
```

#### Start Production Server
```bash
npm run start
```
- Serves production build
- Must run `npm run build` first
- Port: 3000 (default)
- Optimized for performance

#### Lint Code
```bash
npm run lint
```
- Runs ESLint on all files
- Checks for code quality issues
- Checks for Next.js best practices
- Shows warnings and errors

**Fix lint issues automatically**:
```bash
npx eslint . --fix
```

---

## Environment Configuration

### Environment Variables

Currently, the project doesn't use environment variables, but you'll need them for future features.

#### Create Environment Files

**Local Development** (`.env.local`):
```bash
# Create file in project root
touch .env.local
```

**Add Variables**:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# OAuth Credentials
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Database (if needed)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT Secret (server-side only)
JWT_SECRET=your_super_secret_key

# Email Service (if needed)
EMAIL_SERVICE_API_KEY=your_email_api_key
```

#### Variable Naming Rules

**Client-Side Variables**:
- Must start with `NEXT_PUBLIC_`
- Accessible in browser
- Example: `NEXT_PUBLIC_API_URL`

**Server-Side Variables**:
- No prefix needed
- Only accessible in server components/API routes
- Example: `DATABASE_URL`, `JWT_SECRET`

#### Using Environment Variables

**In Code**:
```typescript
// Client-side
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server-side only
const jwtSecret = process.env.JWT_SECRET
```

#### Environment Files (Don't commit to Git)

```gitignore
# .gitignore
.env.local
.env.development.local
.env.production.local
```

---

## IDE Setup

### Visual Studio Code

#### Recommended Extensions

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Lints TypeScript/JavaScript
   - Shows errors inline
   - Auto-fix on save

2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatter
   - Consistent style
   - Format on save

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplete for Tailwind classes
   - Class name suggestions
   - CSS preview on hover

4. **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
   - Quick component scaffolding
   - Useful shortcuts

5. **TypeScript Error Translator** (`mattpocock.ts-error-translator`)
   - Explains TypeScript errors
   - Makes errors more readable

6. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Renames paired HTML/JSX tags
   - Saves time

#### Workspace Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]", "([^'\"`]*)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

#### Keyboard Shortcuts (Optional)

Create `.vscode/keybindings.json`:
```json
[
  {
    "key": "ctrl+shift+r",
    "command": "workbench.action.reloadWindow"
  },
  {
    "key": "ctrl+shift+f",
    "command": "editor.action.formatDocument"
  }
]
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port 3000 Already in Use

**Error**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1** - Kill the process:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2** - Use different port:
```bash
PORT=3001 npm run dev
```

#### Issue 2: Module Not Found

**Error**:
```
Module not found: Can't resolve '@/components/...'
```

**Solution**:
1. Check `tsconfig.json` has path alias:
   ```json
   "paths": {
     "@/*": ["./*"]
   }
   ```
2. Restart TypeScript server in VSCode:
   - `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

#### Issue 3: TypeScript Errors

**Error**:
```
Type 'X' is not assignable to type 'Y'
```

**Solution**:
1. Check type definitions in `types.ts`
2. Ensure imports are correct
3. Run `npm run build` to see all errors
4. Check [TypeScript documentation](https://www.typescriptlang.org/)

#### Issue 4: Styles Not Applying

**Issue**: Tailwind classes not working

**Solution**:
1. Check `globals.css` has `@import "tailwindcss";`
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Clear `.next` cache: `rm -rf .next`
4. Rebuild: `npm run build`

#### Issue 5: Build Fails

**Error**: Various build errors

**Solution**:
1. Clear cache:
   ```bash
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run build
   ```
2. Check for TypeScript errors: `npx tsc --noEmit`
3. Check for ESLint errors: `npm run lint`

#### Issue 6: Slow Development Server

**Issue**: Hot reload is slow

**Solution**:
1. Close unnecessary apps
2. Increase Node memory:
   ```bash
   NODE_OPTIONS='--max-old-space-size=4096' npm run dev
   ```
3. Disable source maps (in `next.config.ts`):
   ```typescript
   const nextConfig = {
     productionBrowserSourceMaps: false
   }
   ```

---

## Deployment

### Deploy to Vercel (Recommended)

Vercel is made by the creators of Next.js and provides the best deployment experience.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? my-app
# - In which directory is your code located? ./
# - Want to override the settings? N
```

#### Step 4: Production Deployment

```bash
vercel --prod
```

**Result**: Your app is live at `https://your-app.vercel.app`

#### Automatic Deployments

1. Push code to GitHub
2. Connect repository to Vercel
3. Every push to `main` deploys automatically
4. Preview deployments for pull requests

### Deploy to Netlify

#### Step 1: Build Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Deploy to Custom Server

#### Step 1: Build

```bash
npm run build
```

#### Step 2: Upload Files

Upload these to your server:
- `.next` folder
- `public` folder
- `package.json`
- `next.config.ts`
- `node_modules` (or run `npm install` on server)

#### Step 3: Start on Server

```bash
npm run start
# Or with PM2 for process management
pm2 start npm --name "my-app" -- start
```

#### Step 4: Configure Reverse Proxy (Nginx)

```nginx
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test registration form validation
- [ ] Check mobile responsiveness
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Verify animations work
- [ ] Check console for errors
- [ ] Test navigation between pages
- [ ] Verify fonts load properly
- [ ] Check performance with Lighthouse
- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics (Google Analytics, Vercel Analytics)

---

## Development Workflow

### Recommended Workflow

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Create Feature Branch** (if using Git)
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Edit components
   - Test in browser
   - Check for TypeScript errors
   - Fix any linting issues

4. **Test Changes**
   - Manual testing in browser
   - Check responsive design
   - Test form validation
   - Verify animations

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Build Test**
   ```bash
   npm run build
   ```
   - Ensure no build errors
   - Check for TypeScript errors
   - Verify production build works

7. **Push and Deploy**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request
   # Merge to main
   # Auto-deploy (if configured)
   ```

---

## Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### File Locations

```
Configuration:    next.config.ts, tsconfig.json, eslint.config.mjs
Global Styles:    app/globals.css
Components:       components/
Pages:            app/
Static Files:     public/
Documentation:    docs/
```

---

## Getting Help

### Resources

- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Docs**: [https://react.dev](https://react.dev)
- **TypeScript Docs**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Tailwind CSS Docs**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

### Community

- **Next.js Discord**: [https://nextjs.org/discord](https://nextjs.org/discord)
- **Stack Overflow**: Tag questions with `next.js`, `reactjs`, `typescript`
- **GitHub Discussions**: Next.js repository

---

Last Updated: February 2026
