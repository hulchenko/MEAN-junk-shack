import { Component } from "@angular/core";
import { Product } from "../common/interfaces/product.interface";
import { Location } from "@angular/common";
import { ProductService } from "../services/product.service";
import { AlertService } from "../services/alert.service";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrl: "./new-product.component.css",
})
export class NewProductComponent {
  isValid = {
    name: true,
    price: true,
    description: true,
    specs: true,
  };

  constructor(public location: Location, private productService: ProductService, private alert: AlertService) {}

  product: Product = {
    // id: uuid()
    name: "",
    price: null,
    description: "",
    specs: "",
    in_stock: true,
    created_at: new Date(),
  };

  addProduct(product: Product) {
    let valid = true;

    Object.entries(product).forEach(([key, val]) => {
      if (!val) {
        this.isValid[key] = false;
        valid = false;
      }
    });

    if (valid) {
      this.productService.addProduct(product);
      // console.log(`created!`);
      this.alert.call("success", "Success", "The post has been created.");
      this.location.back(); // TODO should fire on successful DB response
    } else {
      this.alert.call("warn", "Warn", "Fields cannot be empty.");
    }
  }

  onFileUpload(event) {
    console.log(`FILE UPLOADED: `, event);
  }
}
