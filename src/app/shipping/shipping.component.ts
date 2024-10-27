import { Component } from "@angular/core";
import { CartService } from "../services/cart.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.css"],
})
export class ShippingComponent {
  shippingCosts = this.cartService.getShippingPrices();

  constructor(private cartService: CartService, public location: Location) {}

  goBack() {
    this.location.back();
  }
}
