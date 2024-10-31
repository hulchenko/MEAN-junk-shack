import { Location } from "@angular/common";
import { Component, inject } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.css",
})
export class PageNotFoundComponent {
  location = inject(Location);
}
