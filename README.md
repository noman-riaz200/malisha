# EduPro — Study Abroad Platform

A production-ready Next.js 14 platform for international student admissions, similar to MalishaEdu.com.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 App Router + TypeScript + Tailwind CSS |
| Backend  | Next.js Route Handlers (REST API) |
| Database | MongoDB Atlas + Mongoose |
| Auth     | NextAuth v5 (JWT, httpOnly cookies, RBAC) |
| Storage  | AWS S3 (presigned URLs — files go directly to S3) |
| Payments | Stripe Checkout + PayPal Orders API + Webhooks |
| Email    | Resend (transactional) |
| Fonts    | Playfair Display + DM Sans (Google Fonts) |

---

## Quick Start

```bash
# 1. Create Next.js app
npx create-next-app@latest edupro --typescript --tailwind --app --eslint --no-src-dir
cd edupro

# 2. Install dependencies
npm install next-auth@beta mongoose bcryptjs stripe \
  @aws-sdk/client-s3 @aws-sdk/s3-request-presigner \
  zod resend nanoid slugify react-hook-form \
  @hookform/resolvers recharts clsx tailwind-merge

npm install -D @types/bcryptjs tsx

# 3. Copy source files from EduPro_Source_Code.zip
# (place each file at its exact path shown in the archive)

# 4. Configure environment
cp .env.example .env.local
# Fill in all values in .env.local

# 5. Seed the database (creates admin user + sample data)
npx tsx scripts/seed.ts

# 6. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Default Credentials (after seeding)

| Role  | Email                | Password    |
|-------|----------------------|-------------|
| Admin | admin@edupro.com     | Admin@1234  |

> Change these immediately in production.

---

## File Structure (Key Files)

```
edupro/
├── app/
│   ├── (auth)/                    # Login, Register, Forgot Password
│   ├── (public)/                  # Homepage, Universities, Contact, Consultation
│   │   ├── page.tsx               # Homepage
│   │   ├── universities/
│   │   │   ├── page.tsx           # University listing + filters
│   │   │   └── [slug]/page.tsx    # University detail + programs
│   │   ├── contact/page.tsx
│   │   └── get-free-consultation/page.tsx
│   ├── dashboard/                 # Student portal (protected)
│   │   ├── page.tsx               # Overview
│   │   ├── applications/page.tsx  # Application list + tracker
│   │   ├── payments/page.tsx      # Payment history
│   │   ├── documents/page.tsx     # Uploaded docs
│   │   └── profile/page.tsx       # Profile settings
│   ├── admin/                     # Admin panel (admin role required)
│   │   ├── page.tsx               # Analytics dashboard
│   │   ├── universities/          # CRUD for universities
│   │   ├── applications/          # Application pipeline management
│   │   ├── students/              # Student management
│   │   └── inquiries/             # Lead management
│   └── api/                       # All REST API routes
├── components/
│   ├── layout/                    # Navbar, Footer, DashboardSidebar, AdminSidebar
│   ├── university/                # UniversityCard, Filters, IntakeCountdown
│   ├── homepage/                  # SearchBar, StatsCounter, TestimonialSlider
│   ├── forms/ApplicationForm/     # Multi-step application wizard
│   ├── admin/                     # ApplicationReviewPanel, DeleteButton
│   └── ui/                        # Button, Modal, DataTable, FileUpload, Pagination
├── lib/
│   ├── db/
│   │   ├── mongoose.ts            # DB connection singleton
│   │   └── models/               # User, University, Program, Application, Payment, ...
│   ├── auth/config.ts             # NextAuth v5 config
│   ├── services/emailService.ts   # Resend email service
│   └── validations/              # Zod schemas
├── middleware.ts                  # Edge middleware (route protection + RBAC)
├── types/index.ts                 # Shared TypeScript types
└── .env.example                   # All required environment variables
```

---

## Environment Variables

See `.env.example` for all required variables. Key ones:

```bash
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=...              # openssl rand -base64 32
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AWS_S3_BUCKET=edupro-uploads-prod
RESEND_API_KEY=re_...
```

---

## Stripe Webhook Setup

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Forward webhooks locally: `stripe listen --forward-to localhost:3000/api/payments/webhook/stripe`
3. In production, add endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/payments/webhook/stripe`
   - Events: `checkout.session.completed`, `charge.refunded`

---

## AWS S3 Setup

```bash
# Create bucket
aws s3api create-bucket --bucket edupro-uploads-prod --region us-east-1

# Block public access (files served via presigned URLs only)
aws s3api put-public-access-block \
  --bucket edupro-uploads-prod \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Add CORS policy for direct browser uploads
aws s3api put-bucket-cors --bucket edupro-uploads-prod --cors-configuration '{
  "CORSRules": [{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "MaxAgeSeconds": 3000
  }]
}'
```

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel --prod
# Add all env vars in Vercel dashboard → Settings → Environment Variables
```

### VPS with PM2
```bash
npm run build
pm2 start ecosystem.config.js --env production
pm2 save && pm2 startup
```

### Docker
```bash
docker build -t edupro .
docker run -p 3000:3000 --env-file .env.local edupro
```

---

## Role-Based Access Control

| Route | Student | Admin |
|-------|---------|-------|
| `/` and public pages | ✅ | ✅ |
| `/dashboard/*` | ✅ Own data only | ✅ All data |
| `/admin/*` | ❌ Redirect to /dashboard | ✅ |
| `POST /api/universities` | ❌ 403 | ✅ |
| `PATCH /api/applications/[id]/status` | ❌ 403 | ✅ |
| `GET /api/applications` | ✅ Own only | ✅ All |

---

## Application Status Flow

```
Draft → Submitted → Under Review → Approved
                              ↘ Rejected
```

Each transition sends an email notification to the student via Resend.

---

## Security Features

- Passwords: bcrypt with cost factor 12
- Auth tokens: httpOnly cookie (JWT, never localStorage)
- File uploads: presigned S3 URLs (files bypass Next.js server), AES-256 server-side encryption
- RBAC: enforced at Edge Middleware AND inside every API route handler
- Rate limiting: implement with Upstash Redis for production
- Input validation: Zod on every API route
- Stripe webhooks: signature verification with `stripe.webhooks.constructEvent()`
- Environment variables: never committed, loaded at runtime only

---

## Production Checklist

- [ ] Set `NEXTAUTH_SECRET` to a strong random value (`openssl rand -base64 32`)
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Set up S3 bucket with proper CORS and encryption
- [ ] Add Stripe webhook endpoint in Stripe Dashboard
- [ ] Configure Resend sending domain (add DNS records)
- [ ] Change default admin password after seeding
- [ ] Enable MongoDB Atlas backups
- [ ] Set up error monitoring (Sentry: `npm install @sentry/nextjs`)
- [ ] Configure Vercel Analytics or self-hosted analytics

---

## License

MIT — Build on top of this freely.
