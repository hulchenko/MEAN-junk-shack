import { Product } from "./product.interface";

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface PaginationAndProduct {
  currPage: number;
  offset?: number;
  totalRecords?: number;
  products?: Product[];
}

export { PageEvent, PaginationAndProduct };
