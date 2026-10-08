# Harish R — Personal Developer Portfolio

Modern, responsive, high-performance personal portfolio website for **Harish R**, Computer Science & Engineering undergraduate at **SSN College of Engineering, Chennai**, targeting **Java Full Stack Developer** and **Software Developer** roles.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## ⚡ Quick Start (Running Locally)

### Prerequisites
- Node.js (version 18 or newer recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser. The server supports instant Hot Module Replacement (HMR).

### 3. Check for Linting
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
This compiles TypeScript and outputs an optimized static bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 How & Where to Update Your Information

All your personal details, links, projects, skills, and coursework are centralized in one single configuration file:
👉 **`src/data/portfolioData.ts`**

You do not need to hunt through dozens of component files to change your details. Simply edit `src/data/portfolioData.ts`:

### 1. Updating Social Links & Contact Details
Inside `src/data/portfolioData.ts`:
```typescript
personal: {
  name: "Harish R",
  email: "harishravi1006@gmail.com",
  phone: "+91 94944 72190",
  linkedin: "https://linkedin.com/in/harishravi10",
  github: "https://github.com/harishravi10",
  location: "Chennai, Tamil Nadu, India",
  cgpa: "6.3 / 10",
  // ...
}
```

### 2. Adding / Updating Projects & Repository Links
Inside `src/data/portfolioData.ts`, edit the `projects` array:
```typescript
{
  id: "hospital-management-system",
  title: "Hospital Management System",
  category: "Java & Database Application",
  tech: ["Java", "JDBC", "MySQL", "OOP"],
  description: "...",
  features: [...],
  githubUrl: "https://github.com/harishravi10/hospital-management", // <-- Update your repo URL here
  // ...
}
```

### 3. Adding New Skills & Categories
Inside `src/data/portfolioData.ts`, edit the `skills` array to add technologies, frameworks, or tools under any category:
```typescript
{
  title: "Backend Development",
  description: "Server-side architecture, enterprise Java & frameworks",
  skills: [
    { name: "Java" },
    { name: "JDBC" },
    { name: "Servlets" },
    { name: "JSP" },
    { name: "Spring Boot" }
  ]
}
```

### 4. Adding a Downloadable Resume
1. Place your resume PDF in the `public/` directory named `resume.pdf` (`public/resume.pdf`).
2. It will be accessible directly at `/resume.pdf` on your live website.

---

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended — 2 Minutes)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of developer portfolio"
   git branch -M main
   git remote add origin https://github.com/harishravi10/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com/) with GitHub.
3. Click **Add New Project** &rarr; Select your `portfolio` repository.
4. Framework Preset: **Vite** (detected automatically).
5. Click **Deploy**. Vercel gives you an instant HTTPS URL with automatic CI/CD on every git push!

### Option 2: Netlify
1. Drag and drop the `dist/` folder directly onto [Netlify Drop](https://app.netlify.com/drop), OR
2. Connect your GitHub repository:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.ts`, set the base path to your repository name (e.g., `base: '/portfolio/'`).
3. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run build && npm run deploy`.

---

## 🎨 Design Features Included

- **Dark Developer Aesthetic**: Tailored obsidian & slate palette with subtle blue/purple accent glows.
- **Interactive Java Code Runner**: Hero section code card with live compiler simulation executing `Turning ideas into applications.`
- **Interactive Project Mockups**: Dashboard representation for Hospital Management System and interactive storefront for E-Commerce.
- **Project Deep-Dive Modals**: Architecture layers, DAO design pattern details, and feature highlights.
- **Dynamic Category Filtering**: Instant skill filtering by Languages, Backend, Databases, Web, Tools, and Core Concepts.
- **Development Journey Roadmap**: Step-by-step visual progression from B.E. at SSN to Java Full Stack focus.
- **Validated Contact Form**: Frontend form verification with instant email client draft fallback (`mailto:`) and one-click copy buttons for email and phone.
- **100% Truthful**: Zero fake metrics, zero fake testimonials, zero fake experience — crafted specifically for recruiter trust.
- **Fast & Responsive**: Fully responsive across mobile, tablet, laptop, and 4K desktop screens.
