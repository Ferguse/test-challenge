import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockedStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { App } from '../App';

describe('components [App]', () => {
  const state = {
    wishList: {},
    categories: {
      entities: [],
    },
    current: {},
  };

  const store = configureMockedStore([thunk])(state);

  it('Renders', () => {
    const tree = renderer
      .create(<Provider store={store}><App /></Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
