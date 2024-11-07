import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  http = inject(HttpClient);

  fetchData(url: string): Observable<any> {
    return this.http.get(url).pipe(
      tap((val) => console.log(`Products: `, val)),
      catchError((err) => {
        console.error("Error in fetchData", err);
        return of({ ok: false, message: "Failed to get products", error: err });
      })
    );
  }

  fetchDataById(url: string): Observable<any> {
    return this.http.get(url).pipe(
      tap((val) => console.log(`Single product: `, val)),
      catchError((err) => {
        console.error("Error in fetchDataById", err);
        return of({ ok: false, message: "Failed to get product", error: err });
      })
    );
  }

  purgeData(url: string): Observable<any> {
    return this.http.delete(url).pipe(
      tap((val) => console.log(`Delete product: `, val)),
      catchError((err) => {
        console.error("Error in purgeData", err);
        return of({ ok: false, message: "Failed to delete product", error: err });
      })
    );
  }
}
