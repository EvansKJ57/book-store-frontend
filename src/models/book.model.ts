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
  indexList: string[];
  price: number;
  pubDate: string;
  likeCounts: number;
}

export interface IBookDetail extends IBook {
  categoryName: string;
  liked: boolean;
}
