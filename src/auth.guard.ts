import { inject, Injectable } from "@angular/core";
import { AuthService } from "./app/services/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  auth = inject(AuthService);
  router = inject(Router);
  location = inject(Location);

  authRoutes = ["/login", "/register"];

  canActivate(): boolean {
    if (this.auth.user()) {
      console.log(`GUARD GOOD!`);
      return true;
    }
    // if (this.auth.user() && this.authRoutes.includes(this.location.path())) {
    //   this.router.navigateByUrl("/products");
    //   return true;
    // }
    console.log(`1: `, this.auth.user());
    console.log(`2: `, this.router.url);
    console.log(`3: `, this.location.path());
    console.log(`4: `, this.authRoutes.includes(this.location.path()));
    console.log(`5: `, this.auth.user() && this.authRoutes.includes(this.location.path()));
    // prevent unauthenticated user from accessing the app
    console.log(`GUARD BAD!`);
    this.router.navigateByUrl("/login");
    return false;
  }
}
