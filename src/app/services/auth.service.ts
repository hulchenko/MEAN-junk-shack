import { inject, Injectable, signal } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, Observable } from "rxjs";
import { User } from "../common/interfaces/user.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = inject(AngularFireAuth);
  router = inject(Router);

  dbUser$ = this.auth.user;
  user = signal<User | null | undefined>(undefined); // initialize as undefined to ensure proper initialization

  userRegister(email: string, password: string): Observable<void> {
    const promise = this.auth.createUserWithEmailAndPassword(email, password).then(() => {});
    return from(promise);
  }

  userLogIn(email: string, password: string): Observable<void> {
    const promise = this.auth.signInWithEmailAndPassword(email, password).then(() => {});
    return from(promise);
  }

  userLogout(): Observable<void> {
    const promise = this.auth.signOut();
    this.router.navigateByUrl("/login");
    return from(promise);
  }
}
