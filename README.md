# Ketamine Association

<div align="center">

![Ketamine Association](https://img.shields.io/badge/Ketamine-Association-0D9488?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEyaC00bC0zIDlMOSAzbC0zIDloLTQiLz48L3N2Zz4=)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**The nation's leading digital platform connecting ketamine therapy practitioners with patients through education, certification, lead generation, and professional community.**

[Live Demo](https://ketamineassociation.org) | [Documentation](#documentation) | [API Reference](#api-documentation)

</div>

---

## Overview

The Ketamine Association is a comprehensive dual-sided marketplace platform designed to bridge the gap between patients seeking ketamine therapy and qualified healthcare practitioners. Our mission is to advance the safe, ethical, and effective use of ketamine therapy for mental health conditions by providing rigorous provider verification, continuous education, and an unwavering commitment to patient safety.

### Key Statistics

| Metric | Value |
|--------|-------|
| Verified Providers | 500+ |
| Patients Helped | 50,000+ |
| Satisfaction Rate | 98% |
| Blog Articles | 40 |
| Total Routes/Pages | 63 |
| React Components | 48 |
| API Endpoints | 28 |

---

## Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router, Server Components, and API routes
- **[React 19](https://react.dev/)** - UI library with concurrent features and Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons
- **[Class Variance Authority](https://cva.style/)** - Component variant management

### Database & ORM
- **[Prisma 6](https://www.prisma.io/)** - Next-generation TypeScript ORM
- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time capabilities
- **[PostgreSQL](https://www.postgresql.org/)** - Production database

### Authentication & Payments
- **[Clerk](https://clerk.com/)** - Complete user management and authentication
- **[Stripe](https://stripe.com/)** - Payment processing and subscription management

### Email & Communication
- **[Resend](https://resend.com/)** - Modern email delivery API
- **[React Email](https://react.email/)** - Email templates with React

### Data Validation & Forms
- **[Zod 4](https://zod.dev/)** - TypeScript-first schema validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization

---

## Features

### For Patients

| Feature | Description |
|---------|-------------|
| **Provider Directory** | Search and filter verified ketamine therapy providers by location, specialty, treatment type, and conditions treated |
| **Educational Resources** | Comprehensive guides on ketamine therapy, what to expect, and treatment options |
| **Course Enrollment** | Access educational courses about ketamine therapy and mental health |
| **Consultation Booking** | Schedule consultations directly with practitioners |
| **Provider Reviews** | Read authentic reviews from verified patients |
| **Saved Providers** | Save and compare providers for later review |

### For Practitioners

| Feature | Description |
|---------|-------------|
| **Professional Profiles** | Create detailed profiles showcasing credentials, specialties, and treatment approaches |
| **Lead Management** | Full-featured dashboard for managing patient inquiries and consultations |
| **Analytics Dashboard** | Track profile views, lead conversions, and practice growth metrics |
| **Membership Tiers** | Tiered membership options with increasing visibility and features |
| **CE Credit Courses** | Access continuing education courses for professional development |
| **Certification Programs** | Obtain industry-recognized ketamine therapy certifications |
| **Event Access** | Participate in conferences, webinars, and networking events |

### Membership Tiers

| Tier | Features |
|------|----------|
| **Free** | Basic profile listing, limited visibility |
| **Professional** | Enhanced profile, lead notifications, basic analytics |
| **Premium** | Priority listing, advanced analytics, CE credits access |
| **Elite** | Featured placement, unlimited leads, all certifications, dedicated support |
| **Enterprise** | Custom solutions for multi-provider practices |

### Platform Features

- **63 Routes/Pages** - Comprehensive site structure with SEO optimization
- **48 React Components** - Reusable, accessible UI components
- **28 API Endpoints** - RESTful API for all platform operations
- **40 Blog Articles** - SEO-optimized educational content
- **Full E-commerce** - Product store with Stripe checkout
- **Event Management** - Registration and ticketing system
- **Newsletter System** - Email subscription and campaign management
- **Admin Dashboard** - Complete platform administration

---

## Project Structure

```
ketamine-association/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages layout
│   ├── about/                    # About page
│   ├── academy/                  # Education platform
│   │   ├── courses/              # Course catalog and learning
│   │   │   └── [slug]/           # Individual course pages
│   │   │       └── learn/        # Course learning interface
│   │   ├── patients/             # Patient education
│   │   │   └── conditions/       # Condition-specific info
│   │   └── practitioners/        # Practitioner education
│   │       ├── ce-credits/       # CE credit courses
│   │       └── certification/    # Certification programs
│   ├── admin/                    # Admin dashboard
│   │   ├── articles/             # Article management
│   │   ├── practitioners/        # Practitioner management
│   │   ├── reviews/              # Review moderation
│   │   └── users/                # User management
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin endpoints
│   │   ├── articles/             # Article CRUD
│   │   ├── checkout/             # Payment processing
│   │   ├── consultations/        # Consultation booking
│   │   ├── courses/              # Course enrollment
│   │   ├── events/               # Event management
│   │   ├── leads/                # Lead management
│   │   ├── newsletter/           # Newsletter subscriptions
│   │   ├── practitioners/        # Practitioner data
│   │   ├── providers/            # Provider search
│   │   ├── reviews/              # Review submission
│   │   ├── store/                # E-commerce
│   │   ├── users/                # User management
│   │   └── webhooks/             # Clerk & Stripe webhooks
│   ├── articles/                 # Article pages
│   │   └── [slug]/               # Individual articles
│   ├── association/              # Association pages
│   │   ├── [slug]/               # Dynamic association pages
│   │   ├── community/            # Community features
│   │   ├── directory/            # Member directory
│   │   ├── events/               # Events calendar
│   │   │   └── [slug]/           # Event details
│   │   ├── membership/           # Membership info
│   │   ├── pricing/              # Pricing page
│   │   └── sponsorship/          # Sponsorship opportunities
│   │       └── apply/            # Sponsorship application
│   ├── auth/                     # Authentication
│   │   └── callback/             # OAuth callbacks
│   ├── blog/                     # Blog listing
│   │   └── [slug]/               # Blog posts
│   ├── contact/                  # Contact page
│   ├── dashboard/                # User dashboards
│   │   ├── analytics/            # Analytics view
│   │   ├── leads/                # Lead management
│   │   ├── patient/              # Patient dashboard
│   │   │   ├── consultations/    # Consultation history
│   │   │   ├── courses/          # Enrolled courses
│   │   │   ├── saved/            # Saved providers
│   │   │   └── settings/         # Patient settings
│   │   ├── practitioner/         # Practitioner dashboard
│   │   │   ├── analytics/        # Practice analytics
│   │   │   ├── leads/            # Lead inbox
│   │   │   ├── membership/       # Membership management
│   │   │   └── profile/          # Profile editor
│   │   ├── profile/              # Profile management
│   │   ├── reviews/              # Reviews management
│   │   └── settings/             # Account settings
│   ├── disclaimer/               # Legal disclaimer
│   ├── education/                # Education hub
│   ├── privacy/                  # Privacy policy
│   ├── providers/                # Provider directory
│   │   └── [slug]/               # Provider profiles
│   ├── publish/                  # Article submission
│   │   └── submit/               # Submit article
│   └── terms/                    # Terms of service
├── components/                   # React components
│   ├── academy/                  # Academy components
│   ├── admin/                    # Admin UI components
│   ├── blog/                     # Blog components
│   ├── checkout/                 # Checkout flow
│   ├── events/                   # Event components
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   ├── pricing/                  # Pricing components
│   ├── providers/                # Provider components
│   ├── sections/                 # Page sections
│   ├── sponsorship/              # Sponsorship components
│   ├── store/                    # E-commerce components
│   └── ui/                       # Base UI components
├── content/                      # Content files
│   └── articles/                 # 40 markdown blog articles
├── emails/                       # Email templates
├── lib/                          # Utilities and configs
│   ├── actions/                  # Server actions
│   ├── auth/                     # Auth utilities
│   ├── supabase/                 # Supabase client
│   ├── cart-context.tsx          # Shopping cart state
│   ├── clerk-utils.tsx           # Clerk helpers
│   ├── email.ts                  # Email service
│   ├── prisma.ts                 # Prisma client
│   ├── stripe.ts                 # Stripe configuration
│   ├── utils.ts                  # General utilities
│   └── validations.ts            # Zod schemas
├── prisma/                       # Database
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
│   └── images/                   # Image assets
├── scripts/                      # Utility scripts
├── supabase/                     # Supabase config
└── tests/                        # Test files
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database (Supabase recommended)
- **Stripe** account for payments
- **Clerk** account for authentication
- **Resend** account for emails

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ketamine-association.git
   cd ketamine-association
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment** (see [Environment Variables](#environment-variables))

5. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file with the following variables:

### Database (Supabase)

```env
# Pooled connection (Transaction mode) - Use for the application
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection - Use for migrations
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### Authentication (Clerk)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx

# Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Payments (Stripe)

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Price IDs for membership tiers
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_PREMIUM_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_ELITE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_ELITE_ANNUAL_PRICE_ID=price_xxxxx
```

### Email (Resend)

```env
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@ketamineassociation.org
```

### Search (Algolia) - Optional

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=xxxxx
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=xxxxx
ALGOLIA_ADMIN_KEY=xxxxx
```

### Application

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Setup

### Schema Overview

The Prisma schema defines a comprehensive data model for the platform:

#### Core Models

| Model | Description |
|-------|-------------|
| `User` | Base user account (Patient, Practitioner, Admin, Moderator) |
| `Practitioner` | Healthcare provider profiles with verification status |
| `Patient` | Patient profiles with saved providers and course enrollments |
| `Lead` | Patient inquiries to practitioners |
| `Consultation` | Scheduled consultations between patients and providers |
| `Review` | Patient reviews of practitioners |

#### Education Models

| Model | Description |
|-------|-------------|
| `Course` | Educational courses with CE credits |
| `CourseModule` | Individual course modules with video content |
| `CourseEnrollment` | Student enrollments and progress tracking |
| `Certification` | Practitioner certifications |

#### Content Models

| Model | Description |
|-------|-------------|
| `Article` | Blog posts and educational articles |
| `Event` | Conferences, webinars, and workshops |
| `EventRegistration` | Event attendance tracking |
| `Product` | E-commerce products |
| `NewsletterSubscriber` | Email list subscribers |

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Run migrations (production)
npm run db:migrate

# Seed the database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

---

## API Documentation

### Authentication

All authenticated endpoints require a valid Clerk session. Include the session token in the `Authorization` header.

### Core Endpoints

#### Providers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/providers` | List all providers with filters |
| GET | `/api/providers/search` | Search providers by location |
| GET | `/api/providers/[id]` | Get provider details |
| GET | `/api/practitioners` | List practitioners |
| GET | `/api/practitioners/[id]` | Get practitioner details |
| PUT | `/api/practitioners/[id]` | Update practitioner profile |

#### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | List leads for practitioner |
| POST | `/api/leads` | Submit new lead |
| PUT | `/api/leads/[id]` | Update lead status |

#### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List available courses |
| GET | `/api/courses/[slug]` | Get course details |
| POST | `/api/courses/[slug]/enroll` | Enroll in course |
| PUT | `/api/courses/[slug]/progress` | Update progress |

#### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List upcoming events |
| GET | `/api/events/[id]` | Get event details |
| POST | `/api/events/[id]/register` | Register for event |

#### Store

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/store/products` | List products |
| POST | `/api/store/checkout` | Create checkout session |

#### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/practitioners` | List all practitioners |
| PUT | `/api/admin/practitioners/[id]/verify` | Verify practitioner |
| GET | `/api/admin/reviews` | List pending reviews |
| PUT | `/api/admin/reviews/[id]/moderate` | Moderate review |

### Webhooks

| Endpoint | Provider | Purpose |
|----------|----------|---------|
| `/api/webhooks/clerk` | Clerk | User sync and events |
| `/api/webhooks/stripe` | Stripe | Payment and subscription events |

---

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Next.js

2. **Configure environment variables**
   - Add all environment variables from `.env.example`
   - Ensure production URLs are set correctly

3. **Configure build settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Set up webhooks**
   - Update Clerk webhook URL to `https://yourdomain.com/api/webhooks/clerk`
   - Update Stripe webhook URL to `https://yourdomain.com/api/webhooks/stripe`

### Database Migrations (Production)

```bash
# Run migrations in production
npx prisma migrate deploy
```

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test authentication flow
- [ ] Test payment processing with Stripe test mode
- [ ] Verify webhook endpoints are accessible
- [ ] Run database migrations
- [ ] Test email delivery
- [ ] Verify SSL certificate

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

---

## Contributing

We welcome contributions to the Ketamine Association platform. Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run typecheck
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Standards

- Use TypeScript for all new code
- Follow the existing code style
- Add proper types and interfaces
- Write meaningful commit messages
- Update documentation as needed

---

## Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please send an email to security@ketamineassociation.org. Do not create a public GitHub issue.

### Security Measures

- All user passwords are hashed using Clerk's secure authentication
- API endpoints are protected with authentication middleware
- Database queries use parameterized statements via Prisma
- Stripe handles all payment card data (PCI compliant)
- HTTPS enforced in production
- Rate limiting on API endpoints
- Input validation using Zod schemas

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

- **Documentation**: Check this README and inline code documentation
- **Issues**: [GitHub Issues](https://github.com/yourusername/ketamine-association/issues)
- **Email**: support@ketamineassociation.org

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Supabase](https://supabase.com/) - Database platform
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Resend](https://resend.com/) - Email delivery

---

<div align="center">

**Built with care for the mental health community**

[Website](https://ketamineassociation.org) | [Twitter](https://twitter.com/ketamineassoc) | [LinkedIn](https://linkedin.com/company/ketamine-association)

</div>
