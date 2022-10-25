import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { transformOverflowText } from 'utils/transformOverflowText';
import { setCurrentBook, setCurrentCategory } from 'actions';

import './card.scss';

const Card = ({ id, volumeInfo, category }) => {
  const dispatch = useDispatch();
  const style = { '--category-color': category.color };

  const handleClick = useCallback(() => {
    dispatch(setCurrentBook(id));
    dispatch(setCurrentCategory(category.name));
  }, [id, category]);

  return (
    <div className="card" style={style}>
      <Link to={`/category/${category.name}/book/${id}`} onClick={handleClick}>
        <div className="card-content flex direction-column justify-between">
          <div className="card-image flex justify-center">
            <img src={volumeInfo?.imageLinks?.thumbnail} alt={volumeInfo.title} loading="lazy"/>
            <i className="fi fi-rs-books card-icon"></i>
          </div>
          <div className="card-info flex direction-column">
            <span className="card-title bold">{transformOverflowText(volumeInfo.title)}</span>
            <span>{new Date(volumeInfo.publishedDate).getFullYear()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  volumeInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    publishedDate: PropTypes.string,
  }).isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export { Card };
