//* ini bagian server dimana sebuah konfigurasi server ada disini \r\n

const Hapi = require('@hapi/hapi');
// import routenya \r\n
const routes = require('./routes');

const init = async () => {
  const server = Hapi.Server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      // mendambahkan sebuah cors
      // untuk mengizinkan akses dengan origin lain
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
