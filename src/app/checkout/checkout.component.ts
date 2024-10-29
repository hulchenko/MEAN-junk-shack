import { Component } from "@angular/core";
import { CartService } from "../services/cart.service";
import { UntypedFormBuilder } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent {
  checkoutForm = this.formBuilder.group({
    name: "",
    email: "",
    address: "",
  });

  constructor(private cartService: CartService, private formBuilder: UntypedFormBuilder) {}

  onSubmit() {
    console.log("Your order has been submitted", this.checkoutForm.value);
    // this.cartService.clearCart();
    // this.checkoutForm.reset();
  }
}
