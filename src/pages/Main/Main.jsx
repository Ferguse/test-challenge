import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Carousel } from 'components/Carousel';
import { CATEGORIES } from 'constants/Categories';
import { fetchCategories } from 'actions';

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories(CATEGORIES));
  }, []);

  const carousels = useMemo(() => (
    CATEGORIES.map((category) => <Carousel key={category.name} category={category}/>)), []);

  return (
    <main className="content bg-white">
      <div className="container">
        {carousels}
      </div>
    </main>
  );
};


