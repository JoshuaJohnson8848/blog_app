export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string | null
  createdAt: string;
  updatedAt: string;
  comments: [];
}
