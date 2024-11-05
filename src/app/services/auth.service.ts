import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable, Subscription } from "rxjs";
import { User } from "../common/interfaces/user.interface";
import { CartService } from "./cart.service";

// Firebase
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);
  cart = inject(CartService);

  userSub: Subscription;

  private userInitialized$ = new BehaviorSubject(false);
  userSig = signal<User | null | undefined>(undefined); // init as undefined to ensure proper initialization
  user$ = user(this.auth);

  constructor() {
    this.userSub = this.user$.subscribe((user) => {
      if (user) {
        // monitor user here to preserve their state after reload if need be
        this.userSig.set(user);
        this.userInitialized$.next(true);
      }
    });
  }

  userRegister(email: string, password: string): Observable<void> {
    // transform firebase promises into observables
    const promise = createUserWithEmailAndPassword(this.auth, email, password).then(() => {});
    return from(promise);
  }

  userLogIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(() => {});
    return from(promise);
  }

  userLogout(): Observable<void> {
    const promise = signOut(this.auth);
    this.cart.clearCart();
    this.userSig.set(null);
    this.userInitialized$.next(false);
    this.router.navigateByUrl("/login");
    return from(promise);
  }

  get isUserInitialized() {
    return this.userInitialized$.value;
  }
}
