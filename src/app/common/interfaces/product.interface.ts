export interface Product {
  id?: string;
  imageURL?: string;
  name: string;
  price: number;
  description: string;
  specs: string;
  inStock: boolean;
  createdAt: Date;
  createdBy: string;
}
