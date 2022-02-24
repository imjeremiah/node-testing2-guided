const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where('id', id).first();
}

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit);
  return getById(id);
}

async function update(id, changes) {
  const [id] = await db('hobbits')
    .update({ name: hobbit.name })
    .where(); 
}

function remove(id) {
  return null
}
