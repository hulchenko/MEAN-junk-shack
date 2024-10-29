import { Component, inject } from "@angular/core";
import { Form, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  formError: string | null = null;

  onSubmit() {
    const { email, password } = this.form.getRawValue();
    this.auth.userLogIn(email, password).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => (this.formError = err.code),
    });
  }
}
