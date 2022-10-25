import { BrowserRouter } from 'react-router-dom';

import { Router } from 'routes';

import './app.scss';

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};
