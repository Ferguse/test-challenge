import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import { CATEGORIES } from 'constants/Categories';
import { getUrl } from 'utils/getUrls';

const fetchCategory = async (category) => {
  const data = await fetch(getUrl(category.name));
  const jsonData = await data.json();

  return ({
    [category.name]: jsonData?.items.reduce((acc, book) => ({ ...acc, [book.id]: { ...book, category }}), {}),
  });
};

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const promises = CATEGORIES.map((category) => fetchCategory(category));
    const response = await Promise.all(promises);

    return response.reduce((acc, i) => ({ ...acc, ...i }), {});
  }
);


export const wishListAdd = createAction('wishList/add');
export const wishListRemove = createAction('wishList/remove');

export const setCurrentCategory = createAction('current/category');
export const setCurrentBook = createAction('current/book');
