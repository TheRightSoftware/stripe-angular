import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private stripeService = inject(StripeService);
  private router = inject(Router);

  public amount: number = 10.00;
  public description: string = 'Payment';
  public isLoading: boolean = false;
  public errorMessage: string = '';

  checkout(): void {
    if (!this.amount || this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount greater than 0';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const origin = window.location.origin;

    this.stripeService.createCheckoutSession({
      amount: this.amount,
      description: this.description || 'Payment',
      successUrl: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/cancel`
    }).subscribe({
      next: (response) => {
        if (response.url) {
          window.location.href = response.url;
        } else {
          this.errorMessage = 'Failed to create checkout session';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
        this.errorMessage = error.error?.error || 'Failed to create checkout session. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
