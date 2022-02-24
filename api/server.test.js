const Hobbits = require('./hobbits/hobbits-model');
const db = require('../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('hobbits').truncate();
});

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test the `hobbits` model', () => {
    test('the table is empty', async () => {
        const hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(0);
    });

    test('hobbits get inserted', async () => {
        let result = await Hobbits.insert({ name: 'Frodo' });
        expect(result).toEqual({ name: 'Frodo', id: 1 });
        let hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(1);

        await Hobbits.insert({ name: 'Samwise' });
        hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(2);
    });

    test('can get by id', async () => {
        const {id} = await Hobbits.insert({ name: 'Bilbo' });
        const result = await Hobbits.getById(id);
        expect(result).toHaveProperty('name', 'Bilbo');
    });

    test('update some hobbits', async () => {
        // let result = await Hobbits.insert({ name: 'Frodo' });
        // expect(result).toEqual({ name: 'Frodo', id: 1 });
        // let hobbits = await db('hobbits');
        // expect(hobbits).toHaveLength(1);

        // await Hobbits.insert({ name: 'Samwise' });
        // hobbits = await db('hobbits');
        // expect(hobbits).toHaveLength(2);
    });
})