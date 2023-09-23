// Pada bagian ini terdiri dari route mana saja aplikasi yang akan dituju \r\n
// import fungsi handler \r\n
const {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler, editNoteByIdHandler, deleteNotedByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    // handler untuk untuk medapatkan akes
    handler: getAllNoteHandler,
  },

  // route untuk menampilkan catatan lebuh detail
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // route untuk menguba catatan
  // untuk handler mengunakan method PUT
  // dalam melakukan update

  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  // melakukan delete data dengang mengunakan method DELETE
  // Untuk logika tetap sama dengan update namun ada yang berbeda

  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotedByIdHandler,
  },
];

module.exports = routes;
