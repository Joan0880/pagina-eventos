const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  nombre: String,
  evento: String,
  fecha: String,
  telefono: String
}, { timestamps: true }); // Esto añade la fecha de registro automática

// Si ya existe el modelo, lo borramos de la memoria de Node para que no choque
module.exports = mongoose.models.Cita || mongoose.model('Cita', CitaSchema);