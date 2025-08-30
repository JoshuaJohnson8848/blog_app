export interface User {
  _id: string;
  id: string | null;
  name: string;
  fullName: string;
  phone: string;
  email: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}
