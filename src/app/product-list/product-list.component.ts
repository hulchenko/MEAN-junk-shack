import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../common/interfaces/product.interface";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productSub: Subscription;

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
