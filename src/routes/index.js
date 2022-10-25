import {
  Routes,
  Route,
} from 'react-router-dom';

import { Main } from 'pages/Main';
import { Book } from 'pages/Book';
import { NotFound } from 'pages/NotFound';
import { Category } from 'pages/Category';
import { WishList } from 'pages/WishList';
import { Layout } from 'components/Layout';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="/items/:id" element={<Book />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/category/:id/book/:book" element={<Book />} />
      <Route path="/wish-list" element={<WishList />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
