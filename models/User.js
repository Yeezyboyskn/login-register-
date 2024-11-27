const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para encriptar las contraseñas

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  // Asegura que el nombre de usuario sea único
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el correo sea único
    },
    password: {
        type: String,
        required: true
    }
});

// Encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha cambiado, no hace nada
    this.password = await bcrypt.hash(this.password, 10); // Encripta la contraseña con un "salt" de 10
    next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Método para actualizar la contraseña
userSchema.methods.updatePassword = async function(newPassword) {
    this.password = await bcrypt.hash(newPassword, 10); // Encripta la nueva contraseña
    await this.save(); // Guarda el usuario con la nueva contraseña encriptada
};

const User = mongoose.model('User', userSchema);

module.exports = User;
