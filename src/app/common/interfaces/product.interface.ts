export interface Product {
  id?: number;
  imageURL?: string;
  name: string;
  price: number;
  description: string;
  specs: string;
  inStock: boolean;
  createdAt: Date;
  createdBy: string;
}
