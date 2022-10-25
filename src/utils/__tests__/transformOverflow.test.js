import { transformOverflowText } from '../transformOverflowText';

describe('[utils] getUrls', () => {
  it('should work correctly for sentences less 50', () => {
    expect(transformOverflowText('bike test.')).toStrictEqual('bike test.');
  });

  it('should work correctly for sentences more 50', () => {
    const mockedText = 'Veniam deserunt commodo et dolore nisi dolore sint adipisicing anim.';
    const expectedText = 'Veniam deserunt commodo et dolore nisi dolore...';

    expect(transformOverflowText(mockedText)).toStrictEqual(expectedText);
  });
});
