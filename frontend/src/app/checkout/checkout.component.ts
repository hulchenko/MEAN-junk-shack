import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { delay, retry, Subscription } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { Order } from "../common/interfaces/order.interface";
import { RestApiService } from "../services/rest-api.service";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  cart = inject(CartService);
  auth = inject(AuthService);
  restApi = inject(RestApiService);
  alert = inject(AlertService);
  router = inject(Router);
  productService = inject(ProductService);

  subscriptions: Subscription[] = [];

  currentCart: Product[] = [];
  cartTotal = this.cart.getCartTotal();
  shippingPrice = 0;
  selectedShipping = 3;

  shippingTypes = [
    { type: "Next Day", code: 1, price: 25.99 },
    { type: "3-5 Days", code: 2, price: 9.99 },
    { type: "Up to 15 Days", code: 3, price: 0 },
  ];

  form = this.fb.nonNullable.group({
    email: [{ value: this.auth.userSig().email, disabled: true }, Validators.required],
    address: ["", Validators.required],
    shipping: [0, Validators.required],
  });
  formError: string | null = null;

  ngOnInit(): void {
    this.subscriptions.push(
      this.cart.getCart().subscribe((val) => {
        this.currentCart = val;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  updateTotalDisplayed(event) {
    const selectedShipping = event.value;
    const price = this.shippingTypes.find((type) => type.code === selectedShipping).price;
    this.shippingPrice = price;
    this.selectedShipping = selectedShipping;
  }

  onSubmit() {
    if (this.form.invalid) {
      return; // prevent submission
    }
    const { email, shipping, address } = this.form.getRawValue();

    const newOrder: Order = {
      purchasedBy: email,
      purchasedAt: new Date(),
      deliveryEstimate: this.setDelivery(shipping),
      address,
      totalPaid: this.cartTotal + this.shippingPrice,
      products: this.currentCart,
    };

    this.subscriptions.push(
      this.restApi
        .addData("api/orders", newOrder)
        .pipe(
          // retry for cold starts
          delay(1000),
          retry(2)
        )
        .subscribe((res) => {
          if (res.ok) {
            this.alert.call("success", "Success", "The order has been placed.");

            this.cart.clearCart();
            this.form.reset();
            this.productService.resetProductCache();
            this.router.navigateByUrl("/");
          } else {
            this.alert.call("error", "Error", res.message);
          }
        })
    );
  }

  setDelivery(code: number): Date {
    let days = 15; // default free
    if (code === 1) {
      days = 1;
    } else if (code === 2) {
      days = 5;
    }

    const today = new Date();
    const futureDay = new Date(today);
    futureDay.setDate(today.getDate() + days);

    return new Date(futureDay);
  }
}
