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

export interface PaymentSystem<T> {
  [index: string]: T;
}

export interface CartProduct {
  product: number;
  title: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  qty: number;
}

export interface Screen {
  afterRender?(): void;
  render(): string;
}

export type Data = Array<Product>;

export type Route = {
  resource: string;
  id: string;
  verb: string;
  queryParams: { [name: string]: string };
};
