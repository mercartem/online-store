export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface Screen {
  render(): string;
}
export type Data = Array<Product>;
export type Route = {
  resource: string;
  id: string;
  verb: string;
};
