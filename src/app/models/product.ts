export interface IProduct {
  id: string;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
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
