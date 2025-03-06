import '@testing-library/jest-dom';

// Polyfill for TextEncoder/Decoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock sessionStorage
const mockStorage = {};
global.sessionStorage = {
  getItem: (key) => mockStorage[key],
  setItem: (key, value) => { mockStorage[key] = value; },
  clear: () => { Object.keys(mockStorage).forEach(key => delete mockStorage[key]); }
};
