import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  fb = inject(FormBuilder); // alternative way for dependency injection, like traditional constructor injection

  // http = inject(HttpClient);
  // router = inject(Router);

  // form = this.formBuilder.group({
  //   email: "",
  //   password: "",
  // });
  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    console.log(`registered`);
  }
}
