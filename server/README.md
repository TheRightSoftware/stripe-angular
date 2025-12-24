# Backend Server

Integrated backend server for creating dynamic Stripe Checkout Sessions.

## Setup

The backend is now integrated into the main project. All dependencies are in the root `package.json`.

1. Create a `.env` file in the root directory:
```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
PORT=3000
```

2. Get your Stripe Secret Key:
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your "Secret key" (starts with `sk_test_`)

3. Update `.env` with your Stripe Secret Key

## Run

The backend runs automatically with the frontend when you run:
```bash
npm start
```

Or run just the backend:
```bash
npm run start:backend
```

For development with auto-reload:
```bash
npm run start:backend:dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### POST `/api/create-checkout-session`

Creates a dynamic Stripe Checkout Session.

**Request Body:**
```json
{
  "amount": 10.00,
  "description": "Payment description",
  "successUrl": "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "http://localhost:4200/cancel"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

