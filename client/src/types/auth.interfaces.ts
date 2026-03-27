export interface IUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string; 
  updatedAt: string;
}