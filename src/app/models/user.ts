export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: {
    image: Buffer;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface NewUser {
  name: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  avatar?: string;
}
