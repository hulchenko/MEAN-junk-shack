import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  registerSub: Subscription;

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
    this.registerSub?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return; // prevent submission
    }
    const { email, password } = this.form.getRawValue();
    this.registerSub = this.auth.userRegister(email, password).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => (this.formError = err.code),
    });
  }
}
