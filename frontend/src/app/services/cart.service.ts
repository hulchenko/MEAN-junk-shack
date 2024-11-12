import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  restApi = inject(RestApiService);

  cart: BehaviorSubject<Product[]> = new BehaviorSubject(this.getLocalCart());
  cartTotal = signal(0);

  addToCart(product: Product) {
    const currCart = this.getLocalCart();
    const inCart = currCart.find((item: Product) => item._id === product._id);
    if (!inCart) {
      const updatedCart = [...currCart, product];
      this.cart.next(updatedCart);
      this.updateLocalCart();
      return { ok: true };
    }
    return { ok: false };
  }

  getCart(): Observable<Product[]> {
    return this.cart;
  }

  calculateCartTotal(): void {
    this.cart.subscribe((items) => {
      const total = items.reduce((total, item) => {
        return (total += item.price);
      }, 0);
      this.cartTotal.set(total);
    });
  }

  purgeCartItem(idx: string) {
    const currCart = this.getLocalCart();
    const updatedCart = currCart.filter((item: Product) => item._id !== idx);
    this.cart.next(updatedCart);
    this.updateLocalCart();
  }

  clearCart(): void {
    localStorage.removeItem("cart");
    this.cart.next([]);
  }

  getShippingPrices() {
    return this.restApi.fetchData("api/shipping");
  }

  private getLocalCart(): Product[] {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  private updateLocalCart() {
    const currCart = this.cart.value;
    localStorage.setItem("cart", JSON.stringify(currCart));
  }
}
