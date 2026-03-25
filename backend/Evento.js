const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: String,
  disenoUrl: String, // Aquí irá el link de la imagen
  descripcion: String
});

module.exports = mongoose.model('Evento', EventoSchema);