const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  categoria: { type: String, enum: ['Sillas', 'Mesas', 'Mantelería', 'Lounge', 'Otros'] },
  imagenUrl: String,
  disponible: { type: Boolean, default: true },
  tags: [String] // Ej: ["Boda", "Exterior", "Madera"]
});

module.exports = mongoose.model('Evento', EventoSchema);
