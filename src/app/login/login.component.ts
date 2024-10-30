import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first, timer } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  formError: string | null = null;

  ngOnInit(): void {
    // TODO
    console.log(`LOGIN TOUCHED`, this.auth.user());
    // if (this.auth.user()) {
    //   console.log(`ROUTING`);
    //   this.router.navigateByUrl("/products");
    // }
  }

  onSubmit() {
    const { email, password } = this.form.getRawValue();
    this.auth.userLogIn(email, password).subscribe({
      next: () =>
        timer(200)
          .pipe(first())
          .subscribe(() => this.router.navigateByUrl("/products")),
      error: (err) => (this.formError = err.code),
    });
  }
}
