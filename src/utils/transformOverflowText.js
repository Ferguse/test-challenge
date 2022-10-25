export const transformOverflowText = (text = '') => (text.length > 50 ? `${text.slice(0, 45)}...` : text);
