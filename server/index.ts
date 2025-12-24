import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.use(cors());
app.use(express.json());

interface CheckoutSessionRequest {
  amount: number;
  description?: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CheckoutSessionResponse {
  sessionId: string;
  url: string | null;
}

app.post('/api/create-checkout-session', async (req: Request<{}, CheckoutSessionResponse, CheckoutSessionRequest>, res: Response<CheckoutSessionResponse | { error: string }>) => {
  try {
    const { amount, description, successUrl, cancelUrl } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const amountInCents: number = Math.round(amount * 100);
    const origin: string = (req.headers.origin as string) || 'http://localhost:4200';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || 'Payment',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

app.get('/api/health', (req: Request, res: Response<{ status: string }>) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

