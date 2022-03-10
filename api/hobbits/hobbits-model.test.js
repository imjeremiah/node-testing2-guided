const db = require('../../data/dbConfig');
const Hobbit = require('./hobbits-model');

test('it is the correct environment for the tests', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('Hobbit db access functions', () => {
    describe('Hobbit.getAll', () => {
        it('resolves to all hobbits in the hobbits table', async () => {
            const hobbits = await Hobbit.getAll()
            expect(hobbits.length).toBe(4)
        })
        it('resolves to the correct hobbits shapes', async () => {
            const hobbits = await Hobbit.getAll()
            expect(hobbits[0]).toHaveProperty('id', 1)
            expect(hobbits[0]).toHaveProperty('name', 'sam')
            expect(hobbits[1]).toMatchObject({ id: 2, name: 'frodo' })
            expect(hobbits[2]).toMatchObject({ id: 3, name: 'pippin' })
            expect(hobbits[3]).toMatchObject({ id: 4, name: 'merry' })
        })
    })

    describe('Hobbit.insert', () => {
        it('adds a new hobbit to the table', async () => {
            await Hobbit.insert({ name: 'bilbo' })
            const rows = await db('hobbits')
            expect(rows).toHaveLength(5)
        })
        it('resolves to the newly inserted hobbit', async () => {
            const hobbit = { name: 'smeagle' }
            const newHobbit = await Hobbit.insert(hobbit)
            expect(newHobbit).toMatchObject({ id: 5, name: 'smeagle' })
        })
    })
})