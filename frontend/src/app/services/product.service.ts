import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  restApi = inject(RestApiService);

  products$ = new BehaviorSubject<Product[]>([]);
  productsLoaded = false;

  getProducts(): Observable<Product[]> {
    if (!this.productsLoaded) {
      this.restApi.fetchData("api/products").subscribe((products) => {
        this.products$.next(products);
        this.productsLoaded = true;
      });
    }
    return this.products$;
  }

  getProductById(id: string): Observable<Product> {
    return this.products$.pipe(
      map((products) => products.find((product: Product) => product._id === id)),
      switchMap((product) => {
        if (product) {
          return of(product);
        } else {
          console.log("Product not found locally, pulling from DB");
          return this.restApi.fetchDataById(`api/products/${id}`);
        }
      })
    );
  }

  addProduct(product: Product) {
    const prevArray = this.products$.value;
    const newArray = [...prevArray, product];
    this.products$.next(newArray);
  }

  removeProduct(id: string) {
    return this.restApi.purgeData(`api/products/${id}`).pipe(
      tap((res) => {
        if (res.ok) {
          // update local list
          const prevArray = this.products$.value;
          const newArray = prevArray.filter((p) => p._id !== id);
          this.products$.next(newArray);
        }
      }),
      catchError((err) => err)
    );
  }
}
