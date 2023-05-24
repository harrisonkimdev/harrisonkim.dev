export interface IGuestbook {
  _id: string;
  title: string;
  content: string;
  writer: string;
  password: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}