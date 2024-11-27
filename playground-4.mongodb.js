/* MongoDB Playground */

// 1. Selecciona la base de datos (si no existe, se creará automáticamente cuando insertes datos).
use('oxxo_auth'); // Reemplaza con el nombre que desees para tu base de datos

// 2. Crear una nueva colección (si no existe, MongoDB la creará al insertar datos en ella).
db.createCollection('users'); // Nombre de la colección donde se almacenarán los usuarios

// 3. Insertar un documento de ejemplo para probar la colección
db.users.insertOne({
  username: 'johndoe',
  password: '12345',
  email: 'johndoe@example.com',
  role: 'user',
  createdAt: new Date()
});

// 4. Ver los documentos en la colección 'users'
db.users.find();
