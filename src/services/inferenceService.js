const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    // Periksa apakah image adalah buffer valid
    if (!image || !Buffer.isBuffer(image)) {
      throw new InputError('Gambar tidak valid');
    }

    // Dekode gambar (hanya mendukung JPEG saat ini)
    const tensor = tf.node
      .decodeJpeg(image)  // Proses decoding hanya untuk JPEG
      .resizeNearestNeighbor([224, 224])  // Resize sesuai dengan input model
      .expandDims()  // Tambahkan dimensi untuk batch
      .toFloat();  // Konversi ke tipe data float32

    const prediction = model.predict(tensor);  // Prediksi menggunakan model
    const score = await prediction.data();  // Ambil skor dari prediksi
    const confidenceScore = Math.max(...score) * 100;  // Ambil skor tertinggi

    const classes = ['Cancer', 'Non-cancer'];  // Kelas prediksi

    const classResult = tf.argMax(prediction, 1).dataSync()[0];  // Ambil hasil prediksi
    const label = classes[classResult];  // Tentukan label

    // Tentukan suggestion berdasarkan label
    let suggestion;
    if (label === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
    } else {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
    }

    return { confidenceScore, label, suggestion };  // Kembalikan hasil prediksi
  } catch (error) {
    console.error("Error in prediction:", error);  // Log error untuk debugging
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi silahkan gunakan foto lain');
  }
}

module.exports = predictClassification;
