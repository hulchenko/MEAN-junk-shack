import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { CartService } from "../services/cart.service";
import { Product } from "../common/interfaces/product.interface";
import { Observable, Subscription } from "rxjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  cartService = inject(CartService);

  faTrash = faTrash;
  cartItems$: Observable<Product[]> = this.cartService.getCart();

  removeItem(item: Product) {
    const idx = item.id;
    this.cartService.purgeCartItem(idx);
  }
}
