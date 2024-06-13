import { HttpResponse, http } from 'msw';
import { IBanner } from '@/models/banner.model';

const bannersData: IBanner[] = [
  {
    id: 1,
    title: 'banner 1 title',
    description: 'banner 1 description',
    image: 'https://picsum.photos/id/111/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
  {
    id: 2,
    title: 'banner 2 title',
    description: 'banner 2 description',
    image: 'https://picsum.photos/id/22/1200/400',
    url: 'https://some.url',
    target: 'self',
  },
  {
    id: 3,
    title: 'banner 3 title',
    description: 'banner 3 description',
    image: 'https://picsum.photos/id/33/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
  {
    id: 4,
    title: 'banner 4 title',
    description: 'banner 4 description',
    image: 'https://picsum.photos/id/44/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
];

export const banners = http.get('https://localhost:8443/banners', () => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
