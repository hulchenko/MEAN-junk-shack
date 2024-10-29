import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { Product } from "../common/interfaces/product.interface";
import { AlertService } from "../services/alert.service";
import { ProductService } from "../services/product.service";

import { AngularFireStorage } from "@angular/fire/compat/storage";
import { lastValueFrom, Subscription } from "rxjs";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrl: "./new-product.component.css",
})
export class NewProductComponent implements OnDestroy {
  private uploadSub: Subscription;
  private urlSub: Subscription;

  isValid = {
    name: true,
    price: true,
    description: true,
    specs: true,
  };

  product: Product = {
    // id: uuid()
    name: "",
    price: null,
    description: "",
    specs: "",
    inStock: true,
    createdAt: new Date(),
  };

  selectedFile = null;

  constructor(public location: Location, private productService: ProductService, private alert: AlertService, private storage: AngularFireStorage) {}

  ngOnDestroy(): void {
    this.uploadSub?.unsubscribe();
    this.urlSub?.unsubscribe();
  }

  async addProduct(product: Product) {
    const isFormValid = this.validateForm(product);
    if (isFormValid) {
      const imgURL = await this.fileUpload(this.selectedFile);
      this.product.imageURL = imgURL;
      this.productService.addProduct(product);

      console.log(`PRODUCT: `, this.product);
      this.alert.call("success", "Success", "The post has been created.");
      this.location.back(); // TODO should fire on successful DB response
    } else {
      this.alert.call("warn", "Warn", "Fields cannot be empty.");
    }
  }

  validateForm(product: Product) {
    let isFormValid = true;

    Object.entries(product).forEach(([key, val]) => {
      if (!val) {
        this.isValid[key] = false;
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  async fileUpload(file): Promise<string> {
    let url = "";
    if (file) {
      const filePath = `images/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      await lastValueFrom(uploadTask.snapshotChanges()); // await for upload to complete

      url = await lastValueFrom(fileRef.getDownloadURL()); // retrieve download URL
      console.log(`UPLOADED: `, url);
    }
    return url;
  }

  onFileSelect(event) {
    console.log(`FILE EVENT: `, event);
    this.selectedFile = event.files[0];
    console.log(`FILE: `, this.selectedFile);
  }
}
