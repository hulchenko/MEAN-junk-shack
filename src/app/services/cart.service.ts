import { Injectable } from "@angular/core";
import { Product } from "./../common/interfaces/product.interface";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: Product[] = [];

  constructor(private restApi: RestApiService) {}

  addToCart(product: Product) {
    this.cart = this.getCartFromMemory();
    this.cart.push(product);
    this.updateMemoryCart();
  }

  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || this.cart;
  }

  updateCart() {
    // TODO
  }

  clearCart() {
    localStorage.removeItem("cart");
    this.cart = [];
    return this.cart;
  }

  getShippingPrices() {
    const path = "../../assets/shipping-rates.json";
    return this.restApi.fetchData(path);
  }

  getCartFromMemory() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  updateMemoryCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
