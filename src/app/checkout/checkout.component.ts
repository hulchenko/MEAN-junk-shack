import { Component } from "@angular/core";
import { CartService } from "../services/cart.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent {
  checkoutForm = this.formBuilder.nonNullable.group({
    name: ["", Validators.required],
    email: ["", Validators.required], // TODO this is going to be prefilled
    address: ["", Validators.required],
  });

  constructor(private cartService: CartService, private formBuilder: FormBuilder) {}

  onSubmit() {
    console.log("Your order has been submitted", this.checkoutForm.value);
    // this.cartService.clearCart();
    // this.checkoutForm.reset();
  }
}
