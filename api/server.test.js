const Hobbits = require('./hobbits/hobbits-model');
const db = require('../data/dbConfig');


test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});