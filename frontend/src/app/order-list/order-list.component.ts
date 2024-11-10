import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../common/interfaces/order.interface";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.css",
})
export class OrderListComponent {
  orderService = inject(OrderService);

  orders$: Observable<Order[]> = this.orderService.getOrders();
}
