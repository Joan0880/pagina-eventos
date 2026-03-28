import React, { useState, useEffect } from 'react';

function Publico() {
  const [eventos, setEventos] = useState([]);
  const [portada, setPortada] = useState({
    nombre: "ESTEISY EVENTS",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552",
    esVideo: false
  });

  const API_URL = "https://pagina-eventos-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/ver-eventos`).then(res => res.json()).then(data => setEventos(data));
    fetch(`${API_URL}/ver-portada`).then(res => res.json()).then(data => { if(data.nombre) setPortada(data); });
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* 1. PORTADA IMPACTANTE (HERO) */}
      <header style={{ 
        height: '100vh', 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${portada.mediaUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '4rem', color: '#d4af37', letterSpacing: '5px', marginBottom: '10px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
          {portada.nombre}
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', fontStyle: 'italic', opacity: 0.9 }}>
          Creamos experiencias inolvidables. Desde la planificación hasta el último detalle de tu gran día.
        </p>
        <a href="#contacto" style={{ 
          marginTop: '30px', padding: '15px 40px', background: '#d4af37', color: 'black', 
          fontWeight: 'bold', textDecoration: 'none', borderRadius: '50px', transition: '0.3s' 
        }}>RESERVAR AHORA</a>
      </header>

      {/* 2. SECCIÓN DE SERVICIOS (PROFESIONAL) */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: '#0a0a0a' }}>
        <h2 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '50px' }}>Nuestros Servicios VIP</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {['Bodas de Lujo', 'XV Años', 'Eventos Corporativos', 'Baby Showers'].map(serv => (
            <div key={serv} style={{ background: '#111', padding: '30px', borderRadius: '15px', width: '250px', border: '1px solid #222' }}>
              <h3 style={{ color: '#d4af37' }}>{serv}</h3>
              <p style={{ fontSize: '0.9rem', color: '#888' }}>Logística completa y decoración personalizada para que no te preocupes por nada.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GALERÍA DE EVENTOS (CATÁLOGO) */}
      <section id="galeria" style={{ padding: '80px 5%' }}>
        <h2 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '40px' }}>Galería de Sueños Realizados</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {eventos.map(ev => (
            <div key={ev._id} style={{ 
              borderRadius: '15px', overflow: 'hidden', position: 'relative', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)', cursor: 'pointer' 
            }}>
              <img src={ev.mediaUrl} style={{ width: '100%', height: '350px', objectFit: 'cover', display: 'block' }} alt={ev.nombre} />
              <div style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, 
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '20px' 
              }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{ev.nombre}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FORMULARIO DE CONTACTO */}
      <section id="contacto" style={{ padding: '100px 20px', background: 'linear-gradient(#0a0a0a, #000)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', padding: '40px', borderRadius: '20px', border: '1px solid #d4af37' }}>
          <h2 style={{ textAlign: 'center', color: '#d4af37' }}>Solicita tu Cotización</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input placeholder="Nombre Completo" style={{ padding: '15px', background: '#222', border: 'none', color: 'white', borderRadius: '8px' }} />
            <input placeholder="Teléfono" style={{ padding: '15px', background: '#222', border: 'none', color: 'white', borderRadius: '8px' }} />
            <select style={{ padding: '15px', background: '#222', border: 'none', color: 'white', borderRadius: '8px' }}>
              <option>Tipo de Evento</option>
              <option>Boda</option>
              <option>Cumpleaños</option>
              <option>Corporativo</option>
            </select>
            <button style={{ 
              padding: '15px', background: '#d4af37', color: 'black', fontWeight: 'bold', 
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem' 
            }}>ENVIAR SOLICITUD</button>
          </form>
        </div>
      </section>

      {/* 5. WHATSAPP FLOTANTE */}
      <a 
        href="https://wa.me/1809XXXXXXX" // PON TU NUMERO AQUI JOAN
        target="_blank" rel="noreferrer"
        style={{ 
          position: 'fixed', bottom: '30px', right: '30px', 
          backgroundColor: '#25d366', color: 'white', padding: '20px', 
          borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', zIndex: 1000
        }}
      >
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z"/>
        </svg>
      </a>

      {/* FOOTER */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <p style={{ color: '#555' }}>© 2026 {portada.nombre} - Santo Domingo, RD. Calidad y Elegancia.</p>
      </footer>
    </div>
  );
}

export default Publico;
