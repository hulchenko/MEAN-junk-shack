import { inject, Injectable, signal } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable, tap } from "rxjs";
import { User } from "../common/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = inject(AngularFireAuth);
  router = inject(Router);

  private userInitialized$ = new BehaviorSubject(false);
  userSig = signal<User | null | undefined>(undefined); // init as undefined to ensure proper initialization
  user$ = new BehaviorSubject(undefined);

  constructor() {
    // globally initialize and monitor user
    console.log(`AUTH SERVICE FIRED`);
    this.auth.user
      .pipe(
        tap((firebaseUser) => {
          const user = firebaseUser ? { email: firebaseUser.email } : null;
          this.userSig.set(user);
          this.user$.next(user);
          if (user) {
            this.userInitialized$.next(true);
          }
          console.log(`USER: `, user);
        })
      )
      .subscribe();
  }

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
    this.userSig.set(null);
    this.userInitialized$.next(false);
    this.router.navigateByUrl("/login");
    return from(promise);
  }

  get isUserInitialized() {
    return this.userInitialized$.value;
  }
}
