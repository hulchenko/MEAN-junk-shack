import { Product } from "./product.interface";

export interface Order {
  _id?: string; // provided by DB
  purchasedBy: string;
  purchasedAt: Date;
  deliveryEstimate: Date;
  address: string;
  totalPaid: number;
  products: Product[];
}
