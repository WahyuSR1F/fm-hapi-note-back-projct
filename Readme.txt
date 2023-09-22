Tools yang digunakan
Nodemon
Tools pertama adalah nodemon, ia bisa dikatakan wajib digunakan selama proses pengembangan. Pasalnya, dengan tools ini kita tak perlu menjalankan ulang server ketika terjadi perubahan pada berkas JavaScript. Nodemon akan mendeteksi perubahan kode JavaScript dan mengeksekusi ulang secara otomatis.

npm install nodemon --save-dev

Kemudian, di dalam package.json, buat npm runner script baru untuk menjalankan server.js menggunakan nodemon.

"scripts": {
    "start": "nodemon server.js"
 },

 Lalu, jalankan perintah npm run start pada Terminal.

 Nodemon berhasil mengeksekusi server.js dan akan terus mengawasi perubahan kode yang ada. Yuhu! Kini Anda tidak perlu menjalankan ulang perintah npm run start setiap terjadi perubahan pada berkas JavaScript. Cukup simpan perubahannya dan nodemon akan menjalankan ulang secara otomatis.


 ESLint
Tools yang kedua adalah ESLint, ia dapat membantu atau membimbing Anda untuk selalu menuliskan kode JavaScript dengan gaya yang konsisten. Seperti yang Anda tahu, JavaScript tidak memiliki aturan yang baku untuk gaya penulisan kode, bahkan penggunaan semicolon. Karena itu, terkadang kita jadi tidak konsisten dalam menuliskannya.

ESLint dapat mengevaluasi kode yang dituliskan berdasarkan aturan yang Anda terapkan. Anda bisa menuliskan aturannya secara mandiri atau menggunakan gaya penulisan yang sudah ada seperti AirBnb JavaScript Code Style, Google JavaScript Code Style, dan StandardJS Code Style. Kami sarankan Anda untuk mengikuti salah satu code style yang ada. Mengapa begitu? Jawabannya karena code style tersebut sudah banyak digunakan oleh JavaScript Developer di luar sana.

install
npm install eslint --save-dev

Sebelum digunakan, Anda perlu melakukan konfigurasi terlebih dahulu. Caranya dengan menggunakan perintah berikut di Terminal proyek:

npx eslint --init

Kemudian, Anda akan diberikan beberapa pertanyaan. Silakan jawab pertanyaan yang ada dengan jawaban berikut:

How would you like to use ESLint? -> To check, find problems, and enforce code style.
What type of modules does your project use? -> CommonJS (require/exports).
Which framework did you use? -> None of these. 
Does your project use TypeScript? -> N.
Where does your code run? -> Node (pilih menggunakan tanda panah atau spasi di keyboard).
How would you like to define a style for your project? -> Use a popular style guide.
Which style guide do you want to follow? -> (Anda bebas memilih, sebagai contoh pilih AirBnB).
What format do you want your config file to be in? -> JSON.
Would you like to …… (seluruh pertanyaan selanjutnya) -> Y.


catatan untuk melakukan fix eslint arbb supaya tidak ada error gunakan npx 
eslint --fix file.js

nanoid merupakan salah satu library yang populer untuk menangani ini. Jadi, silakan pasang library tersebut dengan perintah berikut:


Catatan: Pastikan Anda memasang nanoid dengan versi 3.x.x. Karena jika menggunakan versi terbaru, nanoid tidak dapat digunakan dengan format module CommonJS.
npm install nanoid@3.x.x

Penggunaan library ini cukup mudah, kita hanya perlu memanggil method nanoid() dan memberikan parameter number yang merupakan ukuran dari string-nya.


const { nanoid } = require('nanoid');
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
};