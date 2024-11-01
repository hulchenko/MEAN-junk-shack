import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { faBell, faShareNodes } from "@fortawesome/free-solid-svg-icons";

// Interfaces
import { Product } from "../common/interfaces/product.interface";

// Services
import { CartService } from "./../services/cart.service";
import { ProductService } from "../services/product.service";
import { AlertService } from "../services/alert.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  cart = inject(CartService);
  productService = inject(ProductService);
  alert = inject(AlertService);
  location = inject(Location);

  faBell = faBell;
  faShareNodes = faShareNodes;

  productSub: Subscription;
  product: Product = null;
  product$ = new BehaviorSubject<Product | null>(null);

  addToCart(product: Product) {
    const response = this.cart.addToCart(product);
    if (response.ok) {
      this.alert.call("info", "Info", "Item has been added to cart.");
    } else {
      this.alert.call("warn", "Warn", "Item is already in the cart");
    }
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get("productId")); // productId comes from router module
    this.productSub = this.productService.getProductById(productIdFromRoute).subscribe((product) => {
      console.log(`PRODUCT: `, product);
      this.product$.next(product);
    });
  }

  share() {
    const currPath = window.location.href;
    navigator.clipboard.writeText(currPath);
    this.alert.call("info", "Info", "URL copied to clipboard.");
  }

  notify() {
    this.alert.call("success", "Success", "You will be notified when the product is back in stock.");
  }
}
