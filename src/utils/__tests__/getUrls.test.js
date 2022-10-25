import { getUrl } from '../getUrls';

describe('[utils] getUrls', () => {
  it('should work correctly', () => {
    expect(getUrl('bike')).toStrictEqual('https://www.googleapis.com/books/v1/volumes?q=bike');
  });
});
