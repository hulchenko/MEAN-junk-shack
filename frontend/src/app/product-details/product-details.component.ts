import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { faBell, faShareNodes } from "@fortawesome/free-solid-svg-icons";

// Interfaces
import { Product } from "../common/interfaces/product.interface";

// Services
import { CartService } from "../services/cart.service";
import { ProductService } from "../services/product.service";
import { AlertService } from "../services/alert.service";
import { Location } from "@angular/common";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  router = inject(Router);
  route = inject(ActivatedRoute);
  cart = inject(CartService);
  productService = inject(ProductService);
  alert = inject(AlertService);
  location = inject(Location);
  auth = inject(AuthService);

  faBell = faBell;
  faShareNodes = faShareNodes;

  productSub: Subscription;
  product: Product = null;

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getProduct();
  }

  share(): void {
    const currPath = window.location.href;
    navigator.clipboard.writeText(currPath);
    this.alert.call("info", "Info", "URL copied to clipboard.");
  }

  notify(): void {
    this.alert.call("success", "Success", "You will be notified when the product is back in stock.");
  }

  get isCurrUserProduct(): boolean {
    return this.product.createdBy === this.auth.userSig()?.email;
  }

  addToCart(product: Product): void {
    const response = this.cart.addToCart(product);
    if (response.ok) {
      this.alert.call("info", "Info", "Item has been added to cart.");
    } else {
      this.alert.call("warn", "Warn", "Item is already in the cart");
    }
  }

  getProduct(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get("productId"); // productId comes from router module
    this.productSub = this.productService.getProductById(productIdFromRoute).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get("productId");
    this.productService.removeProduct(productIdFromRoute).subscribe((resp) => {
      if (resp.ok) {
        this.router.navigateByUrl("/");
        this.alert.call("info", "Info", resp.message);
      } else {
        this.alert.call("error", "Error", resp.message);
      }
    });
  }
}
