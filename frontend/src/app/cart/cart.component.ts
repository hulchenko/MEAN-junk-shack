import { Component, inject } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { CartService } from "../services/cart.service";

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
    const idx = item._id;
    this.cartService.purgeCartItem(idx);
  }
}
