import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "./../services/cart.service";
import { UntypedFormBuilder } from "@angular/forms";
import { Product } from "../common/interfaces/product.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy {
  private cartSub: Subscription;

  cartItems: Product[] = [];

  checkoutForm = this.formBuilder.group({
    name: "",
    address: "",
  });

  constructor(private cartService: CartService, private formBuilder: UntypedFormBuilder) {}

  ngOnDestroy(): void {
    // clean up subscriptions
    this.cartSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  onSubmit() {
    this.cartService.clearCart();
    console.warn("Your order has been submitted", this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  removeItem(item: Product) {
    console.log(`clicked item: `, item);
    const idx = item.id;
    this.cartService.purgeCartItem(idx);
  }
}
