import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { CartService } from "./../services/cart.service";
import { Product } from "../common/interfaces/product.interface";
import { Subscription } from "rxjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  private cartSub: Subscription;

  faTrash = faTrash;
  cartItems: Product[] = [];

  ngOnDestroy(): void {
    // clean up subscriptions
    this.cartSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeItem(item: Product) {
    const idx = item.id;
    this.cartService.purgeCartItem(idx);
  }
}
