import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    console.log(`logged in`);
  }
}
