import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/auth.guard";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { LoginComponent } from "./login/login.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PostListComponent } from "./post-list/post-list.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RegisterComponent } from "./register/register.component";
import { ShippingComponent } from "./shipping/shipping.component";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: ProductListComponent, canActivate: [AuthGuard] }, // homepage
  { path: "products/:productId", component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: "new", component: NewProductComponent, canActivate: [AuthGuard] },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: "shipping", component: ShippingComponent, canActivate: [AuthGuard] },
  { path: "posts", component: PostListComponent, canActivate: [AuthGuard] },
  { path: "orders", component: OrderListComponent, canActivate: [AuthGuard] },
  { path: "orders/:orderId", component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: "**", component: PageNotFoundComponent }, // wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
