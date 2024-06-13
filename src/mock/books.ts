import { IBook } from '@/models/book.model';
import { HttpResponse, http } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';

const bestBooksData: IBook[] = Array.from({ length: 10 }).map(
  (item, index) => ({
    id: index,
    title: faker.lorem.sentence(),
    img: faker.helpers.rangeToNumber({ min: 100, max: 200 }),
    categoryId: faker.helpers.rangeToNumber({ min: 0, max: 2 }),
    form: '종이책',
    isbn: faker.commerce.isbn(),
    summary: faker.lorem.paragraph(),
    detail: faker.lorem.paragraph(),
    author: faker.person.firstName(),
    pages: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
    contents: faker.lorem.paragraph(),
    price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
    likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
    pub_date: faker.date.past().toISOString(),
  })
);

export const bestBooks = http.get('https://localhost:8443/books/best', () => {
  return HttpResponse.json(bestBooksData, { status: 200 });
});
