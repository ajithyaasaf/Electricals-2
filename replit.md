# CopperBear E-Commerce Platform

## Overview

CopperBear is a full-stack e-commerce platform for electrical products and services based in Madurai. The application provides a complete online shopping experience with product catalog, service bookings, and admin management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CopperBear branding
- **State Management**: React Context API for cart and authentication
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **API Pattern**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Drizzle, using Neon Database)
- **Authentication**: Firebase Authentication with Google Sign-in

### Database Schema
The application uses a PostgreSQL database with the following main entities:
- **Users**: Customer accounts with admin roles
- **Categories**: Product categorization
- **Products**: Electrical products with pricing, inventory, and metadata
- **Services**: Available electrical services with pricing
- **Orders**: Customer purchases with order items
- **Bookings**: Service appointment scheduling

## Key Components

### Product Management
- Product catalog with filtering and search capabilities
- Category-based organization
- Inventory tracking with stock management
- Dynamic pricing with discount support
- Image management for product galleries

### Service Booking System
- Service scheduling with date/time selection
- Booking status tracking (pending, confirmed, in-progress, completed)
- Customer notification system integration
- Service pricing and duration management

### Shopping Cart
- Persistent cart state across sessions
- Real-time quantity updates
- Price calculations with discounts
- Sidebar cart interface for quick access

### Authentication System
- Firebase Authentication integration
- Google OAuth sign-in
- Role-based access control (admin/customer)
- Protected routes and API endpoints

### Admin Dashboard
- Order management and tracking
- Product inventory management
- Service booking oversight
- Customer management
- Analytics and reporting

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js routes handle HTTP requests and responses
3. **Business Logic**: Server-side validation and processing
4. **Database Operations**: Drizzle ORM executes type-safe database queries
5. **Response Handling**: JSON responses with success/error states
6. **Client Updates**: React Query manages cache invalidation and UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connection for Neon PostgreSQL
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **firebase**: Authentication and cloud services
- **wouter**: Lightweight routing library

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Styling variants system

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- Vite development server for frontend hot reloading
- Express.js server with TypeScript compilation via tsx
- Environment variables for database and Firebase configuration
- Replit-specific development tools integration

### Production Build
- Vite builds optimized React bundle to `dist/public`
- esbuild compiles server TypeScript to `dist/index.js`
- Static assets served from build directory
- Database migrations handled via Drizzle Kit

### Database Management
- Drizzle Kit for schema migrations
- PostgreSQL database hosted on Neon
- Connection pooling via Neon serverless driver
- Schema versioning and rollback capabilities

### Environment Configuration
- Firebase project configuration for authentication
- Database URL for PostgreSQL connection
- API keys and secrets management
- CORS and security headers configuration

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The modular design allows for easy feature expansion and maintenance.

## Recent Changes: Latest modifications with dates

### January 11, 2025 - Migration and Feature Implementation
- **Migration Complete**: Successfully migrated project from Replit Agent to Replit environment
- **Multi-language Support**: Added Tamil-English language toggle with comprehensive translations
- **Voice Search**: Implemented voice-activated search functionality using Web Speech API
- **Enhanced UI**: Added CopperBear brand colors to Tailwind configuration
- **Expanded Product Catalog**: Added 10 sample electrical products showcasing categories:
  - Switches & Outlets (Premium switches, MCBs, Smart switches)  
  - Wires & Cables (Copper wires, Extension cords)
  - Tools & Equipment (Multimeters, Soldering irons)
  - Lighting & Fixtures (LED bulbs, Strip lights, Ceiling fans)
- **New Pages**: Created About and Contact pages with brand information
- **API Fixes**: Resolved query parameter serialization issues for product filtering
- **Firebase Integration**: Successfully configured Firebase authentication with Google sign-in

### January 11, 2025 - Eleczo Design Implementation
- **Complete Homepage Redesign**: Implemented exact UX and design patterns from Eleczo.com
- **Top Category Bar**: Added horizontal scrolling product categories with discount badges
- **Hero Banner**: Large promotional banner with "Grab the Deal" messaging and product imagery
- **Best Deals Section**: Grid layout showcasing products with brand logos and discount percentages
- **Shop by Categories**: Clean category grid with product imagery
- **Professional Services**: Dedicated section for service offerings with pricing
- **Enhanced Product Display**: Added proper discount badges, brand logos, and professional styling
- **Language Integration**: Updated translations to support new homepage sections
- **Responsive Design**: Ensured mobile-first approach matching Eleczo's layout patterns