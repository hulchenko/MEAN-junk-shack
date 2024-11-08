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
      tap((val) => console.log(`Product(s): `, val)),
      catchError((err) => {
        console.error("Error in fetchData", err);
        return of({ ok: false, message: "Failed to get products", error: err });
      })
    );
  }

  deleteData(url: string): Observable<any> {
    return this.http.delete(url).pipe(
      tap((val) => console.log(`Delete product: `, val)),
      catchError((err) => {
        console.error("Error in deleteData", err);
        return of({ ok: false, message: "Failed to delete product", error: err });
      })
    );
  }

  addData(url: string, body: object): Observable<any> {
    return this.http.post(url, body).pipe(
      tap((val) => console.log(`Create product: `, val)),
      catchError((err) => {
        console.error("Error in addData", err);
        return of({ ok: false, message: "Failed to delete product", error: err });
      })
    );
  }
}
