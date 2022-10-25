import { useCallback, useMemo } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { carouselConfig } from 'constants/CarouselConfig';
import { Card } from 'components/Card';
import { getCategory } from 'selectors/selectors';
import { setCurrentCategory } from 'actions';

import './carousel.scss';

const Carousel = ({ category }) => {
  const dispatch = useDispatch();
  const { name, color } = category;
  const books = useSelector(getCategory(name)) ?? {};

  const handleClick = useCallback(() => {
    dispatch(setCurrentCategory(name));
  }, [name]);

  const cards = useMemo(() => Object.values(books)
    .map((cardInfo) => <Card key={cardInfo.id} {...{ ...cardInfo, category }} />),
  [books]
  );

  return (
    <div className="carousel">
      <h2 className="title">
        <Link to={`/category/${name}`} onClick={handleClick}>{name}</Link>
        <i className="carousel_indicator" style={{ backgroundColor: color }}></i>
      </h2>
      <Slider {...carouselConfig}>
        {cards}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export { Carousel };
