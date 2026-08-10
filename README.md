# Tech With Hussain — Full Stack Portfolio

**Website:** [techwithhussain.online](https://techwithhussain.online)  
**Developer:** Hussain Lone — Best Web Developer in J&K, Srinagar, Kashmir  

---

## 📁 Project Structure

```
My FULL Stack Portfolio/
│
├── frontend/           → React + Vite app (public website)
│   ├── public/         → Static files (images, robots.txt, sitemap)
│   ├── src/
│   │   ├── components/ → UI components
│   │   │   ├── common/ → Navbar, Footer, Popups, SEOMeta, etc.
│   │   │   ├── home/   → Home page sections
│   │   │   └── admin/  → Admin panel components
│   │   ├── pages/      → Page-level components (one per route)
│   │   │   └── admin/  → Admin panel pages
│   │   ├── context/    → AuthContext (login state)
│   │   ├── data/       → constants.js (site config)
│   │   ├── styles/     → globals.css (design tokens)
│   │   └── utils/      → schema.js (SEO structured data)
│   ├── index.html      → SEO meta tags
│   ├── vite.config.js  → Build config
│   └── package.json
│
├── backend/            → PHP REST API
│   ├── api/            → All API endpoint folders
│   └── uploads/        → User uploaded files
│
└── database/           → Database files
    ├── migrations/     → SQL schema files
    │   ├── schema_hostinger.sql   ← USE THIS for Hostinger
    │   ├── schema_local.sql       ← USE THIS for local dev
    │   └── schema.sql             ← Generic version
    └── scripts/        → Utility scripts (run only when needed)
        ├── reset_admin_password.php
        ├── update_services_table.php
        └── remove_bg.py
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- PHP 8.0+ (with XAMPP/Laragon)
- MySQL 8.0+

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Backend (PHP)
- Copy `backend/` folder into your XAMPP `htdocs/` or Laragon `www/`
- Import `database/migrations/schema_local.sql` into MySQL
- Copy `.env.example` → `.env` and fill in your values
- Backend runs at `http://localhost:8000/api/`

---

## 🌐 Hostinger Deployment

### Step 1 — Build Frontend
```bash
cd frontend
npm run build
# Creates frontend/dist/ folder
```

### Step 2 — Upload to Hostinger File Manager
```
Hostinger public_html/
├── ← Upload everything from frontend/dist/ here
├── api/         ← Upload backend/api/ here
└── uploads/     ← Upload backend/uploads/ here (or create empty)
```

### Step 3 — Database
1. Go to Hostinger → Databases → MySQL
2. Create a new database
3. Import `database/migrations/schema_hostinger.sql`
4. Update `backend/api/config/` with your DB credentials

### Step 4 — Environment
- Update `backend/api/config/database.php` with live DB credentials
- Make sure `uploads/` folder has write permissions (755)

---

## 🔑 Admin Panel
- URL: `https://techwithhussain.online/admin`
- Default login: Set via `database/scripts/reset_admin_password.php`

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Framer Motion |
| Styling | CSS Modules, Vanilla CSS |
| Backend | PHP 8, REST API |
| Database | MySQL 8 |
| Hosting | Hostinger Shared Hosting |
| SEO | React Helmet Async, JSON-LD Schema |
