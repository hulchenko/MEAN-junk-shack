import { Component, OnInit } from "@angular/core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../services/cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  cartSub: Subscription;

  faShoppingCart = faShoppingCart;
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.cart$.subscribe((arr) => {
      if (arr) {
        this.cartCount = arr.length;
      }
    });
  }
}
