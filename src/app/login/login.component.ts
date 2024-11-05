import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, filter, first, map, Subscription, tap, timer } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(AuthService);

  logInSub: Subscription;

  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  formError: string | null = null;

  ngOnInit(): void {
    if (this.auth.isUserInitialized) {
      this.router.navigateByUrl("/");
    }
  }

  ngOnDestroy(): void {
    this.logInSub?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return; // prevent submission
    }
    const { email, password } = this.form.getRawValue();
    this.logInSub = this.auth.userLogIn(email, password).subscribe({
      next: () =>
        timer(200)
          .pipe(first())
          .subscribe(() => this.router.navigateByUrl("/")),
      error: (err) => (this.formError = err.code),
    });
  }
}
