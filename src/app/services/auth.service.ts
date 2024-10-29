import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: firebase.User | null = null;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  userRegister(email: string, password: string): Observable<void> {
    const promise = this.auth.createUserWithEmailAndPassword(email, password).then(() => {});
    return from(promise);
  }

  userLogIn(email: string, password: string): Observable<void> {
    const promise = this.auth.signInWithEmailAndPassword(email, password).then(() => {});
    return from(promise);
  }
}
