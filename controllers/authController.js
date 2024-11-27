const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, password, confirm_password, email } = req.body;

    if (!username || !password || !confirm_password || !email) {
        return res.render('register', { 
            messages: { error: 'Faltan datos obligatorios' } 
        });
    }

    if (password !== confirm_password) {
        return res.render('register', { 
            messages: { error: 'Las contraseñas no coinciden' } 
        });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { 
                messages: { error: 'El usuario ya existe' } 
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.render('register', { 
            messages: { error: 'Error al registrar el usuario' } 
        });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('login', { 
            messages: { error: 'Faltan datos obligatorios' } 
        });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { 
                messages: { error: 'Usuario no encontrado' } 
            });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.render('login', { 
                messages: { error: 'Contraseña incorrecta' } 
            });
        }

        // Si el login es exitoso
        req.session.user = user;
        res.redirect('/dashboard'); // Redirige a dashboard
    } catch (error) {
        console.error(error);
        return res.render('login', { 
            messages: { error: 'Error al iniciar sesión' } 
        });
    }
};

// Cerrar sesión
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/auth/login');
    });
};
