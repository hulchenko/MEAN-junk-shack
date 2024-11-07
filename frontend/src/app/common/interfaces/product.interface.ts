export interface Product {
  _id?: string; // provided by DB
  name: string;
  price: number;
  description: string;
  specs: string;
  inStock: boolean;
  createdAt: Date;
  createdBy: string;
  imageURL?: string; // optional
}
