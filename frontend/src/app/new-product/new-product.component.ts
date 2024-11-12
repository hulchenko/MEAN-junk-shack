import { Location } from "@angular/common";
import { Component, inject, OnDestroy, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileSelectEvent } from "primeng/fileupload";
import { delay, from, Observable, retry, Subscription, switchMap } from "rxjs";
import { Product } from "../common/interfaces/product.interface";
import { AlertService } from "../services/alert.service";
import { AuthService } from "../services/auth.service";
import { ProductService } from "../services/product.service";

// Firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from "@angular/fire/storage";

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
  auth = inject(AuthService);
  router = inject(Router);

  subscriptions: Subscription[] = [];

  downloadURL = signal(null);

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    description: ["", Validators.required],
    specs: ["", Validators.required],
  });

  selectedFile = null;

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alert.call("warn", "Warning", "Fields cannot be empty.");
      return; // prevent submission
    }
    const formData = this.form.getRawValue();

    const newProduct: Product = {
      ...formData,
      imageURL: this.downloadURL(),
      inStock: true,
      createdAt: new Date(),
      createdBy: this.auth.userSig().email,
    };

    this.subscriptions.push(
      this.productService
        .addProduct(newProduct)
        .pipe(
          // retry for cold starts
          delay(1000),
          retry(2)
        )
        .subscribe((res) => {
          if (res.ok) {
            const newProductId = res.product._id;
            this.alert.call("success", "Success", "The post has been created.");
            this.router.navigateByUrl(`/products/${newProductId}`);
          } else {
            this.alert.call("error", "Error", res.message);
          }
        })
    );
  }

  fileUpload(file: File): Observable<string> {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask$ = from(uploadBytes(storageRef, file)); // convert promise into observable

      return uploadTask$.pipe(switchMap((snapshot) => from(getDownloadURL(snapshot.ref)))); // retrieve URL
    }
  }

  onFileSelect(event: FileSelectEvent) {
    const selectedFile = event.files[0];
    this.subscriptions.push(
      this.fileUpload(selectedFile).subscribe({
        next: (url) => this.downloadURL.set(url),
        error: (err) => console.error("File upload error: ", err),
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
