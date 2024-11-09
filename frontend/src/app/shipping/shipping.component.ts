import { Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { Shipping } from "../common/interfaces/shipping.interface";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.css"],
})
export class ShippingComponent {
  cartService = inject(CartService);
  location = inject(Location);

  shippingCosts$: Observable<Shipping[]> = this.cartService.getShippingPrices().pipe(map((res) => (res.ok ? res.shipping : null)));

  goBack() {
    this.location.back();
  }
}
