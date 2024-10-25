import { Component, OnInit } from "@angular/core";
import { CartService } from "./../services/cart.service";
import { UntypedFormBuilder } from "@angular/forms";
import { Product } from "../common/interfaces/product.interface";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  checkoutForm = this.formBuilder.group({
    name: "",
    address: "",
  });

  constructor(private cartService: CartService, private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  onSubmit() {
    this.cart = this.cartService.clearCart();
    console.warn("Your order has been submitted", this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
