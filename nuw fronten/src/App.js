import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);

  // Simulación de carga desde tu backend
  useEffect(() => {
    // Aquí harás el fetch a tu API de MongoDB
    setProductos([
      { id: 1, nombre: "Silla Tiffany Blanca", precio: 125, img: "https://via.placeholder.com/400x533" },
      { id: 2, nombre: "Mesa Redonda Imperial", precio: 450, img: "https://via.placeholder.com/400x533" },
      { id: 3, nombre: "Plato Base Dorado", precio: 85, img: "https://via.placeholder.com/400x533" },
      { id: 4, nombre: "Silla Crossback Madera", precio: 150, img: "https://via.placeholder.com/400x533" }
    ]);
  }, []);

  return (
    <div className="App">
      {/* Navegación */}
      <nav style={{ padding: '25px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>COLECCIONES</div>
        <div className="logo" style={{ fontSize: '1.8rem' }}>ESTEISY EVENTS</div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>MI COTIZACIÓN (0)</div>
      </nav>

      {/* Sección Hero (Imagen Principal) */}
      <header style={{ height: '80vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1500" 
          alt="Banner Esteisy" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Alquiler de Mobiliario Premium</h1>
          <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} style={{ background: 'white', color: 'black', border: 'none' }}>
            Explorar Catálogo
          </button>
        </div>
      </header>

      {/* Catálogo */}
      <main style={{ padding: '80px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem' }}>Nuestra Selección</h2>
          <select style={{ border: 'none', borderBottom: '1px solid black', padding: '5px', outline: 'none' }}>
            <option>Ordenar por</option>
            <option>Precio: Bajo a Alto</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
          {productos.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.nombre} />
              <div style={{ marginTop: '15px' }}>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '5px 0' }}>{p.nombre}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>RD$ {p.precio.toLocaleString()}.00 / día</p>
                <button style={{ width: '100%', marginTop: '15px', padding: '10px' }}>Agregar</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#f4f4f4', padding: '60px 5%', textAlign: 'center' }}>
        <h2 className="logo">ESTEISY EVENTS</h2>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>Santo Domingo, República Dominicana</p>
      </footer>
    </div>
  );
}

export default App;
