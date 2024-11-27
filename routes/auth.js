const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register', { messages: {} });
});

// Procesar el registro
router.post('/register', authController.register);

// Mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login', { messages: {} });
});

// Procesar el login
router.post('/login', authController.login);

// Cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
