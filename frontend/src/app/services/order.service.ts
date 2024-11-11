import { inject, Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject, map, Observable, of, switchMap } from "rxjs";
import { Order } from "../common/interfaces/order.interface";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  restApi = inject(RestApiService);
  auth = inject(AuthService);

  orders$ = new BehaviorSubject<Order[]>([]);
  ordersLoaded = false;

  getOrders(): Observable<Order[]> {
    if (!this.ordersLoaded) {
      const { email } = this.auth.userSig();
      this.restApi.fetchData(`api/orders?email=${email}`).subscribe((res) => {
        if (res.ok) {
          this.orders$.next(res.orders);
          this.ordersLoaded = true;
        }
      });
    }
    return this.orders$;
  }

  getOrderById(id: string): Observable<Order> {
    const { email } = this.auth.userSig();
    return this.orders$.pipe(
      map((orders) => orders.find((order: Order) => order._id === id)),
      switchMap((order) => {
        if (order) {
          return of(order);
        } else {
          console.log("Pulling order from DB");
          return this.restApi.fetchData(`api/orders/${id}?email=${email}`).pipe(map((res) => res.order));
        }
      })
    );
  }

  resetOrderCache() {
    this.ordersLoaded = false;
  }
}
