import { Location } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { AuthService } from "./app/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  auth = inject(AuthService);
  router = inject(Router);
  location = inject(Location);

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      filter((currentUser) => currentUser !== undefined), // ensure the user is defined (object / null)
      map((currentUser) => {
        if (!currentUser) {
          this.router.navigateByUrl("/login");
          return false;
        }
        return true;
      })
    );
  }
}
