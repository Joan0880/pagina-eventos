const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/eventos')
  .then(() => console.log('✅ MONGO CONECTADO'))
  .catch(err => console.log('❌ ERROR DE CONEXION:', err));

// --- RUTA: CONFIGURAR PORTADA (ADMIN) ---
app.post('/config-portada', async (req, res) => {
  try {
    await mongoose.connection.db.collection('configuracion').deleteMany({});
    await mongoose.connection.db.collection('configuracion').insertOne(req.body);
    res.status(201).send('OK');
  } catch (e) { res.status(400).send(e); }
});

// --- RUTA: VER PORTADA (PÚBLICO) ---
app.get('/ver-portada', async (req, res) => {
  try {
    const config = await mongoose.connection.db.collection('configuracion').findOne({});
    res.json(config || { nombre: "Joan Olla", mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552", esVideo: false });
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
  const lista = await mongoose.connection.db.collection('citas').find({}).toArray();
  res.json(lista);
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
  const lista = await mongoose.connection.db.collection('eventos').find({}).toArray();
  res.json(lista);
});

// --- RUTA: BORRAR EVENTO (ADMIN) ---
app.delete('/eventos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.db.collection('eventos').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.send('Eliminado');
  } catch (e) { res.status(400).send(e); }
});

app.listen(5000, () => console.log('🚀 Servidor Joan Olla en Puerto 5000'));