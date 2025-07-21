# Mon Auxiliaire - Moving Company Website

## Overview

This is a full-stack web application for "Mon Auxiliaire", a moving company based in Morocco. The application features a modern, bilingual (French) website with an interactive quote system, contact forms, and comprehensive business information. It's built using a monorepo structure with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Successfully migrated project from Replit Agent to standard Replit environment
✓ Updated logo to new Mon Auxiliaire branding (orange/gold design)
✓ Fixed button visibility issues - changed all "Devis Gratuit" buttons to green for better visibility
✓ Fixed newsletter signup section on Hub page - changed to orange text for visibility in both light and dark modes
✓ Updated phone number display (06 61 20 69 29) to green for better visibility
✓ Created comprehensive Windows installation and deployment guide
✓ All project dependencies successfully installed and configured
✓ Application running smoothly on port 5000
✓ Added PostgreSQL database with Drizzle ORM configuration
✓ Replaced in-memory storage with DatabaseStorage implementation
✓ Database schema successfully deployed with quotes, contacts, and users tables
✓ **NEW**: Implemented intelligent AI assistant using OpenRouter API
✓ **NEW**: Created functional image sliders for homepage and Hub page with real company photos
✓ **NEW**: Replaced all service page images with authentic Mon Auxiliaire company photos
✓ **NEW**: Updated Hub page title to orange color scheme and replaced SVG with image slider
✓ **NEW**: Enhanced README.md and created detailed GUIDE_INSTALLATION_WINDOWS.md for deployment

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tool**: Vite for development and production builds
- **Theme Support**: Light/dark mode with custom theme provider

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful API endpoints
- **Development**: Hot module replacement via Vite integration
- **Error Handling**: Centralized error middleware
- **Request Logging**: Custom middleware for API request tracking

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **ORM**: Drizzle ORM with Zod schema validation
- **Development Storage**: In-memory storage implementation for development
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Core Pages
- **Home**: Hero section, services overview, testimonials, call-to-action
- **Services**: Detailed service descriptions with modal interactions
- **Quote**: Interactive honeycomb-style quote form
- **Contact**: Contact form and business information
- **Hub**: Blog/resources section with moving tips and guides
- **About**: Company information, team, and values

### Interactive Features
- **HoneycombQuote**: Unique hexagonal step-by-step quote form
- **ServiceModal**: Service detail modals with comprehensive information
- **AI Assistant**: Intelligent commercial agent using OpenRouter API (Claude 3.5 Sonnet)
- **Image Sliders**: Dynamic background sliders with real company photos
- **Theme Switcher**: Light/dark mode toggle

### Business Logic
- **Quote System**: Multi-step form collecting moving details, addresses, services
- **Contact Management**: Contact form submissions with service type categorization
- **Analytics Integration**: Google Analytics 4 implementation with event tracking

## Data Flow

### Quote Collection Flow
1. User interacts with honeycomb interface
2. Form data validated using Drizzle-Zod schemas
3. Data submitted to `/api/quotes` endpoint
4. Server validates and stores quote in database
5. Confirmation sent to user with reference

### Contact Management Flow
1. Contact form submission via `/api/contacts`
2. Server-side validation and storage
3. Status tracking (unread/read)
4. Integration ready for CRM systems

### Analytics Flow
1. Page views tracked automatically via useAnalytics hook
2. Custom events tracked for user interactions
3. Google Analytics 4 integration for business insights

## External Dependencies

### UI and Design
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant APIs

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds

### Database and Validation
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Runtime type validation
- **connect-pg-simple**: PostgreSQL session store

### Analytics and Monitoring
- **Google Analytics 4**: Web analytics and conversion tracking
- **Custom event tracking**: User interaction monitoring

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **API Proxy**: Integrated Express server during development
- **Database**: Environment variable configuration for database URL

### Production Build
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Served by Express in production mode
4. **Database**: PostgreSQL with Drizzle migrations via `db:push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **OPENROUTER_API_KEY**: OpenRouter API key for AI assistant functionality
- **VITE_GA_MEASUREMENT_ID**: Google Analytics measurement ID
- **NODE_ENV**: Environment detection for development/production features

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and production-ready deployment configuration. The interactive quote system and bilingual support make it well-suited for the Moroccan moving services market.