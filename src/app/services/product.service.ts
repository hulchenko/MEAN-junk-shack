import { Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { Product } from "../common/interfaces/product.interface";
import { map, Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public products$ = new BehaviorSubject<Product[]>([]);

  constructor(private restApi: RestApiService) {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const path = "./../../assets/products.json";
    this.restApi.fetchData(path).subscribe((data) => this.products$.next(data));
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product> {
    return this.products$.pipe(map((products) => products.find((product: Product) => product.id === id)));
  }

  addProduct(product: Product) {
    const prevArray = this.products$.value;
    const newArray = [...prevArray, product];
    this.products$.next(newArray);
  }
}
