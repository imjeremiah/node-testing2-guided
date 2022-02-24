const Hobbits = require('./hobbits/hobbits-model');
const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

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
        const [id] = await db('hobbits').insert({ name: 'Smeagol' });
        let result = await Hobbits.update(id, { name: 'Gollum' });

        expect(result).toEqual({ id, name: 'Gollum' });
        result = await Hobbits.getById(id);
        expect(result).toEqual({ id, name: 'Gollum' });
    });

    test('hobbit removal', async () => {
        let result = await Hobbits.insert({ name: 'Meriadoc' });
        result = await Hobbits.getById(result.id);
        expect(result).toHaveProperty('name', 'Meriadoc');
        result = await Hobbits.remove(result.id);
        expect(result).toEqual({ id: 1, name: 'Meriadoc' });
        result = await Hobbits.getById(result.id);
        expect(result).not.toBeDefined();
    });
});


describe('test server endpoints', () => {
    test('call the `up` endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });

    test('[GET] /hobbits', async () => {
        let result = await request(server).get('/hobbits');
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(0);

        await Hobbits.insert({ name: 'Meriadoc' });

        result = await request(server).get('/hobbits');
        expect(result.body).toHaveLength(1);
    });



    test('[GET] /hobbits/:id', async () => {
        let result = await Hobbits.insert({ name: 'Meriadoc' });
        result = await request(server).get('/hobbits/' + result.id);
        expect(result.body.name).toBe('Meriadoc');
    });
    // test('[POST] /hobbits', async () => {
    //     expect(true).toBe(false)
    // });
    // test('[DELETE] /hobbits/:id', async () => {
    //     expect(true).toBe(false)
    // });
    // test('[PUT] /hobbits/:id', async () => {
    //     expect(true).toBe(false)
    // });


});