# Angular Stripe Payment Integration

If you want to read the article on how to implement this code in your Angular app, visit: https://therightsw.com/angular-stripe-integration/

A simple Angular application with integrated Express backend for Stripe payment processing.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Stripe account with API keys

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the `server/` directory:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

   This will start both:
   - Backend server on `http://localhost:3000`
   - Angular frontend on `http://localhost:4200`

4. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Development

- **Frontend only**: `npm run start:frontend`
- **Backend only**: `npm run start:backend`
- **Development mode** (with auto-reload): `npm run start:dev`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/angular-stripe/` directory.
