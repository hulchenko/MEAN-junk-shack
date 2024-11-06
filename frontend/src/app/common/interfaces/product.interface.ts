export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specs: string;
  inStock: boolean;
  createdAt: Date;
  createdBy: string;
  imageURL?: string;
}
