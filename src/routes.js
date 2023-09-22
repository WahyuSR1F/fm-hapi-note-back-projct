// Pada bagian ini terdiri dari route mana saja aplikasi yang akan dituju \r\n
// import fungsi handler \r\n
const { addNoteHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
];

module.exports = routes;
