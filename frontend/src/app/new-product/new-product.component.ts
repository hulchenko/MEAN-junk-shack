import { Location } from "@angular/common";
import { Component, inject, OnDestroy, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { from, Observable, Subscription, switchMap } from "rxjs";
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

  private uploadSub: Subscription;

  downloadURL = signal(null);

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    description: ["", Validators.required],
    specs: ["", Validators.required],
  });

  selectedFile = null;

  ngOnDestroy(): void {
    this.uploadSub?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alert.call("warn", "Warn", "Fields cannot be empty.");
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

    this.productService.addProduct(newProduct);

    this.alert.call("success", "Success", "The post has been created.");

    this.location.back(); // TODO should fire on successful DB response
  }

  fileUpload(file): Observable<string> {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask$ = from(uploadBytes(storageRef, file)); // convert promise into observable

      return uploadTask$.pipe(switchMap((snapshot) => from(getDownloadURL(snapshot.ref)))); // retrieve URL
    }
  }

  onFileSelect(event) {
    const selectedFile = event.files[0];
    this.uploadSub = this.fileUpload(selectedFile).subscribe({
      next: (url) => this.downloadURL.set(url),
      error: (err) => console.error("File upload error: ", err),
    });
  }

  goBack() {
    this.location.back();
  }
}
