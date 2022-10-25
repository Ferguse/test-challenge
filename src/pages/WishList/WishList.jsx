import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Card } from 'components/Card';
import { getWishList } from 'selectors/selectors';

import './wishList.scss';

export const WishList = () => {
  const wishList = useSelector(getWishList);
  const wishListData = useMemo(() => (
    Object.values(wishList).map((book) => (
      <Card key={book.id} {...{ ...book }} />
    ))
  ), [wishList]);

  return (
    <section className="category bg-white content">
      <div className="container">
        <div className="category-grid">
          {!wishListData.length && 'Wish list is empty'}
          {wishListData}
        </div>
      </div>
    </section>
  );
};
