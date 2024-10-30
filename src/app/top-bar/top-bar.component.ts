import { Component, inject, OnInit } from "@angular/core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  cartService = inject(CartService);
  auth = inject(AuthService);

  cartSub: Subscription;

  faShoppingCart = faShoppingCart;
  cartCount = 0;

  ngOnInit(): void {
    this.cartSub = this.cartService.cart$.subscribe((arr) => {
      if (arr) {
        this.cartCount = arr.length;
      }
    });
  }
}
