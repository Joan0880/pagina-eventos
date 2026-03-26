import React, { useState, useEffect } from 'react';
import './App.css';

function Publico() {
  const [eventos, setEventos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [config, setConfig] = useState({ 
    nombre: "ESTEISY EVENTS", 
    mediaUrl: "https://r-assets.render.com/imagetomedia_e09d57a3-e22d-48a0-ae28-4444e21a1170.jpg", 
    logoUrl: "https://r-assets.render.com/imagetomedia_a2105151-5360-4416-8c46-d2495b45df86.png",
    esVideo: false 
  });

  // Intentar conectar con tu base de datos (Admin)
  useEffect(() => {
    fetch('https://pagina-eventos-backend.onrender.com/ver-portada')
      .then(res => res.json())
      .then(data => { if(data.nombre) setConfig(data); })
      .catch(() => console.log("Usando datos locales de Esteisy"));

    fetch('https://pagina-eventos-backend.onrender.com/ver-eventos')
      .then(res => res.json())
      .then(data => { if(Array.isArray(data)) setEventos(data); })
      .catch(() => setEventos([
        { _id: '1', nombre: 'Bodas', mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500' },
        { _id: '2', nombre: 'Cumpleaños', mediaUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=500' }
      ]));
  }, []);

  return (
    <div className="App" style={{background: '#000', color: 'white', minHeight: '100vh'}}>
      <header style={{
        position: 'relative', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${config.mediaUrl}) no-repeat center center/cover`
      }}>
        <img src={config.logoUrl} alt="Logo" style={{ width: '150px', borderRadius: '50%', marginBottom: '20px', border: '3px solid #d4af37' }} />
        <h1 style={{fontSize: '3.5rem', color: '#d4af37'}}>{config.nombre}</h1>
        <div style={{display: 'flex', gap: '15px', marginTop: '20px'}}>
          <a href="https://wa.me/18098372057" style={{padding: '10px 20px', border: '2px solid #25d366', color: '#25d366', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>WhatsApp</a>
          <a href="https://instagram.com/joan_cuevas01" style={{padding: '10px 20px', border: '2px solid #E1306C', color: '#E1306C', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>Instagram</a>
        </div>
      </header>

      {/* Sección de eventos y demás... */}
      <section style={{padding: '50px 20px', textAlign: 'center'}}>
        <h2 style={{color: '#d4af37'}}>NUESTROS SERVICIOS</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '40px auto'}}>
          {eventos.map(ev => (
            <div key={ev._id} style={{background: '#111', border: '1px solid #333', borderRadius: '15px', overflow: 'hidden'}}>
              <img src={ev.mediaUrl} style={{width: '100%', height: '200px', objectFit: 'cover'}} alt={ev.nombre} />
              <h3 style={{padding: '15px'}}>{ev.nombre}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Publico;
