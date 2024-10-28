import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

// Interfaces
import { Product } from "../common/interfaces/product.interface";

// Services
import { CartService } from "./../services/cart.service";
import { ProductService } from "../services/product.service";
import { AlertService } from "../services/alert.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  product: Product = null;

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService, private alert: AlertService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.alert.call("info", "Info", "Item has been added to cart.");
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
    this.productSub = this.productService.getProductById(productIdFromRoute).subscribe((data) => (this.product = data));
  }

  share() {
    const currPath = window.location.href;
    navigator.clipboard.writeText(currPath);
    this.alert.call("info", "Info", "URL copied to clipboard.");
  }

  userNotify() {
    this.alert.call("success", "Success", "You will be notified when the product is back in stock.");
  }
}
