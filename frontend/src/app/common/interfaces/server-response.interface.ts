import { Order } from "./order.interface";
import { Product } from "./product.interface";
import { Shipping } from "./shipping.interface";

export interface ServerResponse {
  ok: boolean;
  message?: string;
  product?: Product;
  products?: Product[];
  shipping?: Shipping[];
  order?: Order;
  orders?: Order[];
  currPage: number;
  totalRecords: number;
}
