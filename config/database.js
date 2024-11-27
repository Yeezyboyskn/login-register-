const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/oxxo-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a MongoDB.');
}).catch(err => {
  console.error('Error conectando a MongoDB:', err);
});

module.exports = mongoose;
