import { Product } from "./product.interface";

export interface Order {
  purchasedBy: string;
  purchasedAt: Date;
  deliveryEstimate: Date;
  address: string;
  totalPaid: number;
  products: Product[];
}
