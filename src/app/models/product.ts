export interface IProduct {
  id: string;
  categoryName: string;
  imageData: Buffer;
  name: string;
  description: string;
  price: number;
  quantity: number;
  postColor: string;
  owner: {
    _id: string;
    name: string;
    bio: string;
    email: string;
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: TCategoryFilter;
}

export interface INewProduct {
  category: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: FileList;
  postColor: string;
}

export type TCategoryFilter = "" | "picture" | "service" | "product";

export interface IGetProductsFilters {
  category?: TCategoryFilter;
  name?: string;
  owner?: string;
}
