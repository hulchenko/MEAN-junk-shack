import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product } from "../common/interfaces/product.interface";
import { CartService } from "./../services/cart.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = null;

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService) {
    // console.log(route.snapshot.paramMap.get('productId'));
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert("Product has been added to the cart!");
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get("productId"));

    this.product = this.productService.getProductById(productIdFromRoute);

    console.log(this.product);
  }

  share() {
    //TODO pop-up toast with clipboard URL copied
  }

  onNotify() {
    //TODO pop-up toast with the message "You will be notified when the product goes on sale"
  }
}
