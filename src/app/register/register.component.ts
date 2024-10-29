import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  // alternative way for dependency injection (instead of the traditional constructor injection)
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  // http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  formError: string | null = null;

  onSubmit() {
    const { email, password } = this.form.getRawValue();
    this.auth.userRegister(email, password).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => (this.formError = err.code),
    });
  }
}
