import renderer from 'react-test-renderer';

import { Footer } from '../Footer';

describe('page [Footer]', () => {
  it('Renders', () => {
    const tree = renderer
      .create(<Footer />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
