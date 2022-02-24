const Hobbits = require('./hobbits/hobbits-model');
const db = require('../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})
// beforeEach()

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});