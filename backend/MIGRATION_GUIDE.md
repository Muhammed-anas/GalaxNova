# Database Migration Guide

## Error: "no such table: authtoken_token"

This error occurs because the database tables haven't been created yet. Follow these steps:

## Solution Steps:

1. **Activate your virtual environment** (if you're using one):
   ```bash
   # On Windows
   cd backend
   .venv\Scripts\activate
   
   # Or if using a different virtual environment name
   # venv\Scripts\activate
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   pip install django djangorestframework django-cors-headers python-dotenv requests
   ```

3. **Create migrations** for all apps:
   ```bash
   python manage.py makemigrations
   ```

4. **Apply migrations** to create database tables:
   ```bash
   python manage.py migrate
   ```

5. **Run the server**:
   ```bash
   python manage.py runserver
   ```

## What this does:

- `makemigrations`: Creates migration files for model changes
- `migrate`: Applies migrations to create/update database tables
- This will create the `authtoken_token` table needed for authentication

## Notes:

- The first time you run `migrate`, it will create all Django default tables including:
  - User authentication tables
  - Token authentication tables (authtoken_token)
  - Session tables
  - And other Django core tables

