import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockedStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Book } from '../Book';

describe('Page [Book]', () => {
  const state = {
    wishList: {},
    categories: {
      entities: {
        bike: {
          test: {
            category: {},
          },
        }},
    },
    current: {
      category: 'bike',
      book: 'test',
    },
  };

  const store = configureMockedStore([thunk])(state);
  const history = createMemoryHistory({ initialEntries: ['/home'] });

  it('Renders', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history} location={history.location} navigator={history}>
            <Book />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
