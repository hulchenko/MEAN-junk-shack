import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product } from "../common/interfaces/product.interface";
import { CartService } from "./../services/cart.service";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  product: Product = null;

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
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
    //TODO pop-up toast with clipboard URL copied
    console.log(window.location.href);
    const currPath = window.location.href;
    navigator.clipboard.writeText(currPath);
  }

  onNotify() {
    //TODO pop-up toast with the message "You will be notified when the product goes on sale"
  }
}
