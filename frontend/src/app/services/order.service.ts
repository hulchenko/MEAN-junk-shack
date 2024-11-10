import { inject, Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject, Observable } from "rxjs";
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
        console.log(`RES: `, res);
        if (res.ok) {
          // this.orders = res.orders;
          this.orders$.next(res.orders);
          this.ordersLoaded = true;
        }
      });
    }
    return this.orders$;
  }

  resetOrderCache() {
    this.ordersLoaded = false;
  }
}
