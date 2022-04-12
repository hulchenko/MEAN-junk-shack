import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  // test;

  constructor(private http: HttpClient) {
    // this.test = this.http.get<{ type: string; price: number }[]>(
    //   '/assets/shipping.json'
    // );
    // console.log(`FETCH HERE: `, this.test);
  }

  addToCart(product: Product) {
    console.log(`ITEMS BEFORE: `, this.items);
    this.items.push(product);
    console.log(`ITEMS AFTER: `, this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}
