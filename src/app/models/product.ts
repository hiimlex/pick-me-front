export interface IProduct {
  id: string;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: Buffer;
  owner: {
    _id: string;
    name: string;
    bio: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface NewProduct {
  category: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: FileList;
}
