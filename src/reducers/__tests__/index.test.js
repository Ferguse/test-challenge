import { fetchCategories, setCurrentBook, setCurrentCategory, wishListAdd, wishListRemove } from 'actions';

import { categoriesSlice, wishListSlice, currentSlice } from '../index';

describe('[reducers]', () => {
  describe('categoriesSlice', () => {
    const initialState = {
      entities: {},
      loading: 'idle',
    };

    it('sets values when fetchList is fulfilled', () => {
      const action = { type: fetchCategories.fulfilled, payload: { test: 'test' }};
      const state = categoriesSlice.reducer(initialState, action);
      expect(state).toStrictEqual({
        entities: {
          test: 'test',
        },
        loading: 'idle',
      });
    });
  });

  describe('wishListSlice', () => {
    const initialState = { id1: { test: 'test' }, id2: { test: 'test' }};

    it('sets values', () => {
      const action = { type: wishListAdd, payload: { id: 'id3', test: 'test' }};
      const state = wishListSlice.reducer(initialState, action);
      expect(state).toStrictEqual({ id1: { test: 'test' }, id2: { test: 'test' }, id3: { id: 'id3', test: 'test' }});
    });

    it('remove values', () => {
      const action = { type: wishListRemove, payload: { id: 'id2', test: 'test' }};
      const state = wishListSlice.reducer(initialState, action);
      expect(state).toStrictEqual({ id1: { test: 'test' }});
    });
  });

  describe('currentSlice', () => {
    const initialState = {
      book: null,
      category: null,
    };

    it('sets book value', () => {
      const action = { type: setCurrentBook, payload: 'testId' };
      const state = currentSlice.reducer(initialState, action);
      expect(state).toStrictEqual({ book: 'testId', category: null });
    });

    it('remove category value', () => {
      const action = { type: setCurrentCategory, payload: 'bike' };
      const state = currentSlice.reducer(initialState, action);
      expect(state).toStrictEqual({ book: null, category: 'bike' });
    });
  });
});
