
const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: async (request, h) => {
      const { image } = request.payload;

      // Validasi ukuran file maksimal 1MB
      if (image._data.length > 1000000) {
        const response = h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        });
        response.code(413);
        return response;
      }

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
