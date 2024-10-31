import { environment } from "src/environments/environment";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthGuard } from "src/auth.guard";

// Components
import { AppComponent } from "./app.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RegisterComponent } from "./register/register.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

// Primeng
import { AccordionModule } from "primeng/accordion";
import { MessageService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    FooterComponent,
    NewProductComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormsModule,
    AccordionModule,

    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    //routes
    RouterModule.forRoot([
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "products", component: ProductListComponent, canActivate: [AuthGuard] }, // homepage
      { path: "products/:productId", component: ProductDetailsComponent, canActivate: [AuthGuard] },
      { path: "new", component: NewProductComponent, canActivate: [AuthGuard] },
      { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
      { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: "shipping", component: ShippingComponent, canActivate: [AuthGuard] },
      { path: "**", component: PageNotFoundComponent },
    ]),
  ],
  providers: [MessageService, provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
