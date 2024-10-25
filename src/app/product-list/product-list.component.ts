import { Component, OnInit } from "@angular/core";
import { Product } from "../common/interfaces/product.interface";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts();

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(`PRODUCTS: `, this.products);
    });
  }
}
