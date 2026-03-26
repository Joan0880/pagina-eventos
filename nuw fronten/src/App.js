import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Publico from './Publico';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* LA WEB QUE VEN TUS CLIENTES */}
        <Route path="/" element={<Publico />} />

        {/* TU PUERTA SECRETA (Escribe localhost:3000/admin en el navegador) */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;