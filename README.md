Single React project (merged) for Admin / Agency / Public

How to run:
1. Install dependencies:
   npm install

2. Start mock API:
   npm run start:api
   (runs http://localhost:4003)

3. Start frontend dev server:
   npm run dev
   (open http://localhost:5173)

Routing:
- Admin pages start with /admin/ (e.g. /admin/login, /admin/dashboard)
- Agency pages start with /agency/ (e.g. /agency/login, /agency/register)
- Public pages start with /public/ (e.g. /public/login, /public/register)

Notes:
- Login pages are pixel-focused per PDFs. Other pages are implemented as placeholders (card + notes) ready to be filled with tables/forms/charts.
- If you want all pages filled with complete functionality (forms, charts, pagination), I can continue to implement them page-by-page.
