import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  productService = inject(ProductService);
  productSub: Subscription;

  products: Product[] = [];
  totalRecords = 0;
  currPage = 0;
  offset = 0;

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.getProducts();
    }
  }

  getProducts(): void {
    this.productSub = this.productService.getProducts(this.currPage, this.offset).subscribe((data) => {
      if (data?.products) {
        this.products = data.products;
        this.totalRecords = data.totalRecords;
      }
    });
  }

  paginationEvent({ currPage, offset }) {
    this.currPage = currPage;
    this.offset = offset;
    this.productService.resetProductCache();
    this.getProducts();
  }
}
