import { Component } from "@angular/core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent {
  faShoppingCart = faShoppingCart;
}
