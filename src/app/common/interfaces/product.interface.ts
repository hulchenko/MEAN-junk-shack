export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  specs: string;
  in_stock: boolean;
  created_at: Date;
}
