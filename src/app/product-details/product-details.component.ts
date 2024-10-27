import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product } from "../common/interfaces/product.interface";
import { CartService } from "./../services/cart.service";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs";

import { MessageService } from "primeng/api";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  product: Product = null;

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService, private message: MessageService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.popUp("Added", "Item has been added to cart.");
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
    this.popUp("Copied", "URL saved to clipboard.");
  }

  userNotify() {
    this.popUp("Confirmed", "You will be notified when the product is back in stock.");
  }

  popUp(summary: string, detail: string, severity = "info") {
    this.message.add({ severity, summary, detail });
  }
}
