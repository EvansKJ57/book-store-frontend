import { requestHandler } from './http';

export const fetchBanners = async () => {
  return await requestHandler('get', '/banners');
};
