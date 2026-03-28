const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// CONEXIÓN A MONGODB (Usando la variable de Render)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

// MODELOS DE DATOS
const Evento = mongoose.model('Evento', { nombre: String, mediaUrl: String, esVideo: Boolean });
const Cita = mongoose.model('Cita', { nombre: String, telefono: String, evento: String, fecha: { type: Date, default: Date.now } });
const Portada = mongoose.model('Portada', { nombre: String, mediaUrl: String, esVideo: Boolean });

// RUTAS PARA EL FRONTEND
app.get('/ver-eventos', async (req, res) => {
  const eventos = await Evento.find();
  res.json(eventos);
});

app.get('/ver-citas', async (req, res) => {
  const citas = await Cita.find();
  res.json(citas);
});

app.get('/ver-portada', async (req, res) => {
  const portada = await Portada.findOne();
  res.json(portada || { nombre: "ESTEISY EVENTS", mediaUrl: "" });
});

// RUTAS PARA EL ADMIN (GUARDAR)
app.post('/eventos', async (req, res) => {
  const nuevo = new Evento(req.body);
  await nuevo.save();
  res.json({ mensaje: "Evento guardado" });
});

app.post('/nueva-cita', async (req, res) => {
  const nueva = new Cita(req.body);
  await nueva.save();
  res.json({ mensaje: "Cita guardada" });
});

app.post('/config-portada', async (req, res) => {
  await Portada.deleteMany({});
  const nueva = new Portada(req.body);
  await nueva.save();
  res.json({ mensaje: "Portada actualizada" });
});

// RUTAS PARA BORRAR
app.delete('/eventos/:id', async (req, res) => {
  await Evento.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Borrado" });
});

app.delete('/citas/:id', async (req, res) => {
  await Cita.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Borrada" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
