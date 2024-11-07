import { inject, Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { Product } from "../common/interfaces/product.interface";
import { map, Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  restApi = inject(RestApiService);

  products$ = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.restApi.fetchData("api/products").subscribe((data) => {
      const { products = [] } = data;
      console.log(`PRODUCTS: `, products);
      this.products$.next(products);
    });
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Observable<Product> {
    return this.products$.pipe(map((products) => products.find((product: Product) => product._id === id)));
  }

  addProduct(product: Product) {
    const prevArray = this.products$.value;
    const newArray = [...prevArray, product];
    this.products$.next(newArray);
  }

  removeProduct(id: string) {
    const prevArray = this.products$.value;
    const newArray = prevArray.filter((p) => p._id !== id);
    this.products$.next(newArray);
  }
}
