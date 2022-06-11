export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
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
