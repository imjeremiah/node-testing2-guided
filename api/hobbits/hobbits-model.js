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
  await db('hobbits')
    .update({ name: changes.name })
    .where('id', id); 
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('hobbits')
    .where('id', id)
    .del();
  
  return result;
}
