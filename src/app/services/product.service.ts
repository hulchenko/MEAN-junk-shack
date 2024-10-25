import { Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { Product } from "../common/interfaces/product.interface";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: BehaviorSubject<Product[] | any> = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  constructor(private restApi: RestApiService) {}

  fetchProducts(): void {
    const path = "./../../assets/products.json";
    this.restApi.fetchData(path).subscribe((data) => this.products.next(data));
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number) {
    return this.products.getValue().find((product: Product) => product.id === id);
  }
}
