import { combineReducers, createSlice } from '@reduxjs/toolkit';

import { fetchCategories } from 'actions';

const initialStateCategories = {
  entities: {},
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialStateCategories,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.entities = action.payload;
      });
  },
});

const initialWishList = {};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState: initialWishList,
  reducers: {
    add: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    remove: (state, action) => {
      delete state[action.payload.id];
    },
  },
});

const initialCurrent = {
  book: null,
  category: null,
};

export const currentSlice = createSlice({
  name: 'current',
  initialState: initialCurrent,
  reducers: {
    book: (state, action) => {
      state.book = action.payload;
    },
    category: (state, action) => {
      state.category = action.payload;
    },
  },
});

const reducers = combineReducers({
  categories: categoriesSlice.reducer,
  wishList: wishListSlice.reducer,
  current: currentSlice.reducer,
});

export default reducers;
