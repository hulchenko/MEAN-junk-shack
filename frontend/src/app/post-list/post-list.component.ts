import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrl: "./post-list.component.css",
})
export class PostListComponent {
  productService = inject(ProductService);

  myProducts$: Observable<Product[] | []> = this.productService.getMyProducts();
}
