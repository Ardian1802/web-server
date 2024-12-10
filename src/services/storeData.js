const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore();

  // Pastikan nama collection adalah 'predictions'
  const predictCollection = db.collection('predictions');

  // Validasi struktur data sebelum menyimpan
  const validData = {
    id: id,
    createdAt: data.createdAt,
    result: data.result,
    suggestion: data.suggestion,
  };

  return predictCollection.doc(id).set(validData);
}

module.exports = storeData;
