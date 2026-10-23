# 🍽️ Restaurant Rating Explorer

A modern, full-stack restaurant discovery and rating analytics platform engineered with **React 19**, **Vite**, **Express**, and **PostgreSQL 18**, powered by the authentic CENIDET restaurant dataset.

Refer to the main [Root Project README](../README.md) for full architecture diagrams, API specifications, and setup instructions.

---

## ⚡ Quick Start

### 1. Database
```bash
psql -U postgres -d restaurant_explorer -f database/schema.sql
psql -U postgres -d restaurant_explorer -f database/import_data.sql
```

### 2. Backend (:5000)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend (:5173 / :5174)
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Subdirectories

- **`/frontend`**: React 19 single-page app with custom CSS design system, multi-faceted filtering, and detail modal.
- **`/backend`**: Express REST API with PostgreSQL connection pooling and aggregated analytics endpoints.
- **`/database`**: DDL schema, CSV import scripts, and verification queries.
- **`/data/raw`**: Original CENIDET research dataset CSV files.
