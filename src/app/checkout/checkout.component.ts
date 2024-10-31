import { Component, inject } from "@angular/core";
import { CartService } from "../services/cart.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent {
  fb = inject(FormBuilder);
  cart = inject(CartService);

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    email: ["", Validators.required], // TODO this is going to be prefilled
    address: ["", Validators.required],
  });
  formError: string | null = null;

  onSubmit() {
    if (this.form.invalid) {
      return; // prevent submission
    }
    console.log("Your order has been submitted", this.form.value);
    // this.cartService.clearCart();
    // this.checkoutForm.reset();
  }
}
