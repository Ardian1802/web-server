const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/tedi_bucket-1/model.json');
}

module.exports = loadModel;