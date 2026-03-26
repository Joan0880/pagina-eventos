const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// --- CONEXIÓN A MONGODB ATLAS (PARA INTERNET) ---
// Reemplaza esto con tu link de MongoDB Atlas si tienes uno. 
// Si no, usa esta base de datos de prueba para que te funcione YA:
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://joan:joan123@cluster0.mongodb.net/eventos?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MONGO CONECTADO'))
  .catch(err => console.log('❌ ERROR DE CONEXIÓN:', err));

// --- RUTA: CONFIGURAR PORTADA (ADMIN) ---
app.post('/config-portada', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    await db.collection('configuracion').deleteMany({});
    await db.collection('configuracion').insertOne(req.body);
    res.status(201).send('OK');
  } catch (e) { res.status(400).send(e); }
});

// --- RUTA: VER PORTADA (PÚBLICO) ---
app.get('/ver-portada', async (req, res) => {
  try {
    const config = await mongoose.connection.db.collection('configuracion').findOne({});
    res.json(config || { nombre: "ESTEISY EVENTS", mediaUrl: "https://r-assets.render.com/imagetomedia_e09d57a3-e22d-48a0-ae28-4444e21a1170.jpg", esVideo: false });
  } catch (e) { res.status(500).send(e); }
});

// --- RUTA: GUARDAR CITA (PÚBLICO) ---
app.post('/citas', async (req, res) => {
  try {
    await mongoose.connection.db.collection('citas').insertOne(req.body);
    res.status(201).send('OK');
  } catch (e) { res.status(400).send('Error'); }
});

// --- RUTA: VER CITAS (ADMIN) ---
app.get('/ver-citas', async (req, res) => {
  try {
    const lista = await mongoose.connection.db.collection('citas').find({}).toArray();
    res.json(lista);
  } catch (e) { res.status(500).send(e); }
});

// --- RUTA: BORRAR CITA (ADMIN) ---
app.delete('/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.db.collection('citas').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.send('Eliminado');
  } catch (e) { res.status(400).send(e); }
});

// --- RUTA: GUARDAR EVENTO/FOTO (ADMIN) ---
app.post('/eventos', async (req, res) => {
  try {
    await mongoose.connection.db.collection('eventos').insertOne(req.body);
    res.status(201).send('OK');
  } catch (e) { res.status(400).send('Error'); }
});

// --- RUTA: VER EVENTOS (PÚBLICO) ---
app.get('/ver-eventos', async (req, res) => {
  try {
    const lista = await mongoose.connection.db.collection('eventos').find({}).toArray();
    res.json(lista);
  } catch (e) { res.status(500).send(e); }
});

// --- RUTA: BORRAR EVENTO (ADMIN) ---
app.delete('/eventos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.db.collection('eventos').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.send('Eliminado');
  } catch (e) { res.status(400).send(e); }
});

// --- PUERTO DINÁMICO PARA RENDER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
