import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockedStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { CATEGORIES } from 'constants/Categories';

import { Carousel } from '../Carousel';

describe('components [Carousel]', () => {
  const state = {
    wishList: {},
    categories: {
      entities: [],
    },
    current: {},
  };

  const props = {
    category: CATEGORIES[0],
    volumeInfo: {
      publishedDate: '2020',
      title: 'test',
    },
    id: 'id',
  };

  const store = configureMockedStore([thunk])(state);
  const history = createMemoryHistory({ initialEntries: ['/'] });

  it('Renders', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history} location={history.location} navigator={history}>
            <Carousel {...props} />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
