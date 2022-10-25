export const getCategories = (state) => state.categories?.entities;

export const getCategory = (category) => (state) => getCategories(state)[category];

export const getBookInfo = (category, bookId) => (state) => getCategory(category)(state)[bookId];

export const getWishList = (state) => state.wishList;

export const getCurrent = (state) => state.current;

export const getCurrentBook = (state) => getCurrent(state)?.book;

export const getCurrentCategory = (state) => getCurrent(state)?.category;


