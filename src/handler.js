// handler akan bertangung jawab untuk melakukan handler pada setiap request dari aplikasi \r\n

// untuk mengatasi kerteria properti id merupakan string dan harus unik \r\n
// dengan begitu kita harus mengistall salah satu libray pihak ketiga yaitu nanoid \r\n

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // id regenerate \r\n
  const id = nanoid(16);

  // properti createdAt dan UpdatedAt. karena kasus sekarang menambahkan catatan baru \r\n
  // berarti nilai kedua properti itu seharusnya sama \r\n
  // jadi, kita bisa secara mudah memberikan nilai (new Date().toISOString();) \r\n

  const createdAt = new Date().toISOString();
  const UpdatedAt = createdAt;

  // TODO disini kita sudah memliki properti dari objek catatan secara lengkap \r\n
  // TODO selanjutnya kita masukan nilai tersebut ke dalam array notes \r\n
  // TODO menggunakan method push() \r\n

  const newNote = {
    title, tags, body, id, createdAt, UpdatedAt,
  };

  notes.push(newNote);
  // untuk menentukan apakah newNote sudah masuk \r\n
  // TODO dapat memanfatkan method filter() berdasarakan id catatan \r\n
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // TODO gunakan isSuccess untuk menetukan respone server \r\n
  //* jika isSuccess bernilai true, silahkan beri respons berhasil \r\n
  //* jika false, silahkan beri respons gagal \r\n
  if (isSuccess) {
    const response = h.respone({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // fail
  const respone = h.respone({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  respone.code(500);
  return respone;
};

module.exports = { addNoteHandler };
