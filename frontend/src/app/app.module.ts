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
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RegisterComponent } from "./register/register.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { PostListComponent } from "./post-list/post-list.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";

// Primeng
import { AccordionModule } from "primeng/accordion";
import { MessageService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";

// Firebase
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { PaginatorComponent } from "./paginator/paginator.component";
import { AppRoutingModule } from "./app.routing.module";

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
    PostListComponent,
    OrderListComponent,
    OrderDetailsComponent,
    PaginatorComponent,
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
    DropdownModule,
    PaginatorModule,
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    provideHttpClient(withInterceptorsFromDi()),

    // firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
})
export class AppModule {}
