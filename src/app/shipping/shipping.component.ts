import { Component, inject } from "@angular/core";
import { CartService } from "../services/cart.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.css"],
})
export class ShippingComponent {
  cartService = inject(CartService);
  location = inject(Location);

  shippingCosts = this.cartService.getShippingPrices();

  goBack() {
    this.location.back();
  }
}
