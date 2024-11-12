import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { catchError, forkJoin, of, tap } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { AlertService } from "../services/alert.service";
import { CartService } from "../services/cart.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  cartService = inject(CartService);
  productService = inject(ProductService);
  router = inject(Router);
  alert = inject(AlertService);

  faTrash = faTrash;

  removeItem(item: Product) {
    const idx = item._id;
    this.cartService.purgeCartItem(idx);
  }

  checkoutHandler() {
    // fetch current state of the items and see if they're still in stock

    let soldOut = false;
    const currCart = this.cartService.cart.value;
    if (currCart.length === 0) {
      return;
    }

    const productObservables = currCart.map((product) => {
      return this.productService.getProductById(product._id).pipe(
        catchError((err) => {
          console.error("Error fetching cart items: ", err);
          return of(null);
        })
      );
    });

    forkJoin(productObservables) // wait for all observables to complete
      .pipe(
        tap((dbItems) => {
          const updatedCart = [...this.cartService.cart.value]; // copy current cartItems

          dbItems.forEach((incItem) => {
            if (incItem) {
              const currItemIdx = updatedCart.findIndex((item) => item._id === incItem._id);
              if (currItemIdx >= 0) {
                updatedCart[currItemIdx] = incItem;
              }

              if (!incItem.inStock) {
                // invalidate submission if any of the items are not in stock
                soldOut = true;
                this.productService.resetProductCache();
              }
            }
          });
          // update cart
          this.cartService.cart.next(updatedCart);
          this.cartService.updateLocalCart();
        })
      )
      .subscribe(() => {
        if (soldOut) {
          this.alert.call("warn", "Warning", "Some items in your cart are sold out.");
        } else {
          // proceed to checkout if all cart items are available
          this.router.navigateByUrl("/checkout");
        }
      });
  }
}
