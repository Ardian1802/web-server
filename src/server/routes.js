const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: async (request, h) => {
      const { image } = request.payload;

      // 1. Periksa ukuran file terlebih dahulu (hanya untuk payload lebih dari 1MB)
      if (image && image._data && image._data.length > 1000000) {
        const response = h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        });
        response.code(413);
        return response;
      }

      // 2. Jika file kurang dari 1MB, lanjutkan dengan prediksi
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
