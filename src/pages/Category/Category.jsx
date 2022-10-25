import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getCategory, getCurrentCategory } from 'selectors/selectors';
import { Card } from 'components/Card';

import './category.scss';

export const Category = () => {
  const currentCategory = useSelector(getCurrentCategory);
  const bookList = useSelector(getCategory(currentCategory)) ?? {};

  const modifiedBookList = useMemo(() => Object.values(bookList).map((book) => (
    <Card key={book.id} {...{ ...book, currentCategory }} />
  )), [bookList]) ?? [];

  return (
    <section className="category bg-white content">
      <div className="container">
        <h2 className="title">{currentCategory}</h2>
        <div className="category-grid">
          {modifiedBookList}
        </div>
      </div>
    </section>
  );
};
