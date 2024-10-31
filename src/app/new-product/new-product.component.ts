import { Location } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { AlertService } from "../services/alert.service";
import { ProductService } from "../services/product.service";

import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormBuilder, Validators } from "@angular/forms";
import { lastValueFrom, Subscription } from "rxjs";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrl: "./new-product.component.css",
})
export class NewProductComponent implements OnDestroy {
  fb = inject(FormBuilder);
  location = inject(Location);
  productService = inject(ProductService);
  alert = inject(AlertService);
  storage = inject(AngularFireStorage);

  private uploadSub: Subscription;
  private urlSub: Subscription;

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    description: ["", Validators.required],
    specs: ["", Validators.required],
  });

  selectedFile = null;

  ngOnDestroy(): void {
    this.uploadSub?.unsubscribe();
    this.urlSub?.unsubscribe();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.alert.call("warn", "Warn", "Fields cannot be empty.");
      return; // prevent submission
    }
    const formData = this.form.getRawValue();
    const imageURL = await this.fileUpload(this.selectedFile);

    const newProduct = {
      ...formData,
      imageURL,
      id: 999,
      inStock: true,
      createdAt: new Date(),
    };

    this.productService.addProduct(newProduct);

    console.log(`PRODUCT: `, newProduct);
    this.alert.call("success", "Success", "The post has been created.");
    this.location.back(); // TODO should fire on successful DB response
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
