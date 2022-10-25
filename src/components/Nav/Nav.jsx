import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

import { CATEGORIES } from 'constants/Categories';
import { setCurrentCategory } from 'actions';

import './nav.scss';

export const Nav = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback((name) => () => {
    dispatch(setCurrentCategory(name));
  }, [name]);

  const navList = useMemo(() => (
    CATEGORIES.map(({ name, icon }) => (
      <li key={name} className="nav-item">
        <Link to={`/category/${name}`} onClick={handleClick(name)}>
          <i className={`fi fi-rs-${icon} nav-icon`}></i>
          <span> {name}</span>
        </Link>
      </li>
    ))), []);

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list flex">
          <li className="nav-item">
            <Link to="/">
              <i className="fi fi-rs-home nav-icon"></i>
              <span> Home</span>
            </Link>
          </li>
          {navList}
        </ul>
      </div>
    </nav>
  );
};
