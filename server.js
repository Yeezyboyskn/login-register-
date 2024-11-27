const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');  // Añadir el middleware flash
const path = require('path');
const app = express();

// Configuración de la sesión
app.use(session({
    secret: 'mi_secreto',  // Cambia esto por un secreto fuerte
    resave: false,
    saveUninitialized: true
}));

// Middleware para flash messages
app.use(flash());  // Añadir este middleware

// Resto de la configuración de tu servidor
mongoose.connect('mongodb://localhost:27017/oxxo-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Página principal
app.get('/', (req, res) => res.redirect('/auth/login'));

// Dashboard (página de bienvenida)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('dashboard', { username: req.session.user.username });
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
