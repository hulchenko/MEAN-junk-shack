import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { OrderService } from "../services/order.service";
import { Order } from "../common/interfaces/order.interface";
import { Location } from "@angular/common";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrl: "./order-details.component.css",
})
export class OrderDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);
  location = inject(Location);

  subscriptions: Subscription[] = [];
  order: Order = null;

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get("orderId");

    this.subscriptions.push(
      this.orderService.getOrderById(orderIdFromRoute).subscribe((order) => {
        this.order = order;
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
