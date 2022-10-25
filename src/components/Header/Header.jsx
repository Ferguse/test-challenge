import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getWishList } from 'selectors/selectors';

import './header.scss';

export const Header = () => {
  const wishList = useSelector(getWishList);

  const count = Object.values(wishList)?.length;

  return (
    <header className="header bg-white">
      <div className="container flex justify-between">
        <div className="bold logo">
          <Link to="/">
            ELITE SPORT
          </Link>
        </div>
        <div>
          <Link to="/wish-list">
            <i className="fi fi-rs-heart"></i>
            <span> Wish list </span>
            {!!count && `- (${count})`}
          </Link>
        </div>
      </div>
    </header>
  );
};
