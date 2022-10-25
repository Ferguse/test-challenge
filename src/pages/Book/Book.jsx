import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { wishListAdd, wishListRemove } from 'actions';
import { getBookInfo, getCurrentBook, getCurrentCategory, getWishList } from 'selectors/selectors';

import './book.scss';

export const Book = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(getCurrentCategory);
  const currentBook = useSelector(getCurrentBook);
  const book = useSelector(getBookInfo(currentCategory, currentBook)) ?? {};
  const wishList = useSelector(getWishList);

  const isBookInWishList = useMemo(() => Object.keys(wishList).includes(currentBook), [currentBook, wishList]);
  const buttonTitle = isBookInWishList ? 'Remove from wish list' : 'Add to wish list';

  const { volumeInfo, category } = book || {};
  const { title, authors, imageLinks, categories, language, pageCount, printType, publishedDate } = volumeInfo || {};
  const style = { '--category-color': category.color, 'font-family': category.font };

  const handleClick = useCallback(() => {
    if (isBookInWishList) {
      dispatch(wishListRemove(book));
    } else {
      dispatch(wishListAdd(book));
    }
  }, [book, isBookInWishList]);

  return (
    <div className="content bg-white book" style={style}>
      <div className="container">
        {!!volumeInfo && (
          <>
            <h2 className="title">
              {title}
            </h2>
            <h3>
              {authors?.join(', ')}
            </h3>
            <div className="flex book-content">
              <div className="book_image">
                <img src={imageLinks?.thumbnail} alt={title}/>
              </div>
              <div className="book-description">
                <p className="book-item"><span className="bold">Description: </span>{volumeInfo?.description}</p>
                { !!categories?.length && <p className="book-item"><span className="bold">Category: </span> {categories?.join(', ')}</p> }
                { !!language && <p className="book-item"><span className="bold">Language: </span> {language}</p> }
                { !!pageCount && <p className="book-item"><span className="bold">Pages: </span> {pageCount}</p> }
                { !!printType && <p className="book-item"><span className="bold">Type: </span> {printType}</p> }
                { !!publishedDate && <p className="book-item"><span className="bold">Published: </span> {new Date(publishedDate).getFullYear()}</p> }
                <div>
                  <button className="book-button" onClick={handleClick}>
                    <i className={`fi fi-rs-${category.icon}`}></i>
                    <span> {buttonTitle}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
