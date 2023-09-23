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
    const response = h.response({
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
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// handler mendapatkan seluruh catatan note
// karena tidak membutukan parameter maka tidak perlu mengunakan request dan h
const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// membuat fungsi untuk melihat detail nota

const getNoteByIdHandler = (request, h) => {
  // dalam fungsi ini mengembalikan objek catatan secara spesifik berdasarkan
  // id yang digunakan oleh path parameter
  // mendapatkan id
  const { id } = request.params;

  // get object with id result
  // used filter method
  const note = notes.filter((n) => n.id === id)[0];

  // after get note
  // you must validate, because note must don't undefined

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

// method use to update for note after write
const editNoteByIdHandler = (request, h) => {
  // mendapatkan nilai idnya
  const { id } = request.params;
  // mendapatkan data notes terbaru
  const { title, tags, body } = request.payload;
  // memperbarui nilai properti updateAt,
  // untuk mencatak waktu saat dilakukan perubahan dengan mengunakan Date().toISOString().
  const UpdatedAt = new Date().toISOString();

  // melakukan perubahan catatan lama dengan data terbaru
  // memanfaat indexing array
  // dapatkan dulu index array pada objek catatan sesuai id yang ditetntukan
  // untuk memudahkan gunakan method array findIndex();

  const index = notes.findIndex((note) => note.id === id);

  // melakukan validasi bila id yang dicari ditemukan,
  // index akan bernilai array dari objek yang dicari
  // namun bila tidak ditemukan  gagal index akan bernilai -1,
  // make condition to validate

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      UpdatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }
  // jika gagal
  const response = h.response({
    status: 'fail',
    message: 'gagal memperbarui catatan id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// membuat fuction delete
const deleteNotedByIdHandler = (request, h) => {
  // memanfaatkan index untuk menghapus catatan
  // disini kita kan mendapatkan id yang dikirim melalui path parameter
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  // melakukan validasi apaka bernilai -1 atau tidak
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNotedByIdHandler,
};
