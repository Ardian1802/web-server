const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: async (request, h) => {
      const { image } = request.payload;

      // 1. Periksa ukuran file terlebih dahulu
      if (image._data.length > 1000000) {
        const response = h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        });
        response.code(413);
        return response;
      }

      // 2. Pastikan gambar ada dan valid
      if (!image || !image._data) {
        const response = h.response({
          status: 'fail',
          message: 'Gambar tidak valid atau kosong',
        });
        response.code(400);
        return response;
      }

      // 3. Kirim ke handler untuk prediksi
      return postPredictHandler(request, h);
    },
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'file',
      },
    },
  },
];

module.exports = routes;
