export interface IBook {
  id: number;
  title: string;
  img: number;
  categoryId: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  pub_date: string;
  likes: number;
}

export interface IBookDetail extends IBook {
  categoryName: string;
  liked: boolean;
}

export interface IBookReviewItem {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}

export type IBookReviewItemWrite = Pick<IBookReviewItem, 'content' | 'score'>;
