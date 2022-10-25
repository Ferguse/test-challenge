/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
// eslint-disable-next-line no-unused-vars
const polyfill = require('polyfill');

global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };
