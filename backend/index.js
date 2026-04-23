const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Usa tu propia URL de conexión)
mongoose.connect('mongodb://localhost:27017/esteisy_events')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));

// Modelo de Producto (Basado en tu archivo Evento.js)
const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number,
  imagenUrl: String,
  categoria: String,
  destacado: Boolean
}));

// API para obtener productos
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));
