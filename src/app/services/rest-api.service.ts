import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  public fetchData(url: string) {
    return this.http.get(url).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
      map((data) => data)
    );
  }
}
