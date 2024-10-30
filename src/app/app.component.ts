import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  auth = inject(AuthService);

  ngOnInit() {
    // globally monitor user
    this.auth.dbUser$.subscribe((user) => {
      if (user) {
        this.auth.user.set({
          email: user.email!,
        });
      } else {
        this.auth.user.set(null);
      }
      console.log(`USER: `, this.auth.user());
    });
  }
}
