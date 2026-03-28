const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Conectado"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Esquema único para la Portada
const PortadaSchema = new mongoose.Schema({
  nombre: String,
  mediaUrl: String,
  esVideo: Boolean
});
const Portada = mongoose.model('Portada', PortadaSchema);

// RUTA PARA VER (Público)
app.get('/ver-portada', async (req, res) => {
  try {
    const portada = await Portada.findOne();
    if (portada) {
      res.json(portada);
    } else {
      res.json({ nombre: "ESTEISY EVENTS", mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552" });
    }
  } catch (e) { res.status(500).send(e); }
});

// RUTA PARA GUARDAR (Admin) - ESTA ES LA QUE MANDA
app.post('/config-portada', async (req, res) => {
  try {
    // Borramos lo que haya para que solo exista UNA portada
    await Portada.deleteMany({});
    const nueva = new Portada(req.body);
    await nueva.save();
    console.log("Nuevos datos guardados:", req.body);
    res.json({ mensaje: "¡Configuración Guardada!" });
  } catch (e) { res.status(500).send(e); }
});

// ... (Las demás rutas de eventos y citas se quedan igual)
const Evento = mongoose.model('Evento', { nombre: String, mediaUrl: String });
app.get('/ver-eventos', async (req, res) => { res.json(await Evento.find()); });
app.post('/eventos', async (req, res) => { await new Evento(req.body).save(); res.json({ok:true}); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en ${PORT}`));;
