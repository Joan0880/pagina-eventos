import React, { useState } from 'react';
import './App.css';

function Publico() {
  const [config] = useState({ 
    nombre: "ESTEISY EVENTS", 
    mediaUrl: "https://r-assets.render.com/imagetomedia_e09d57a3-e22d-48a0-ae28-4444e21a1170.jpg", 
    logoUrl: "https://r-assets.render.com/imagetomedia_a2105151-5360-4416-8c46-d2495b45df86.png"
  });

  const [eventos] = useState([
    { _id: '1', nombre: 'Boda Real', mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800' },
    { _id: '2', nombre: 'Cumpleaños de Gala', mediaUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800' },
    { _id: '3', nombre: 'Baby Shower', mediaUrl: 'https://images.unsplash.com/photo-1519225495810-753b31473e2e?q=80&w=800' }
  ]);

  const [seleccionado, setSeleccionado] = useState(null);
  const [fNombre, setFNombre] = useState('');
  const [fEvento, setFEvento] = useState('Boda');
  const [fFecha, setFFecha] = useState('');
  const [fTelefono, setFTelefono] = useState('');

  const enviarCita = (e) => {
    e.preventDefault();
    alert(`¡Solicitud enviada, ${fNombre}! Joan se pondrá en contacto pronto por WhatsApp.`);
    setFNombre(''); setFFecha(''); setFTelefono('');
  };

  return (
    <div className="App" style={{background: '#000', color: 'white', minHeight: '100vh'}}>
      {/* PORTADA CON TU FOTO Y LOGO */}
      <header style={{
        height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${config.mediaUrl}) no-repeat center center/cover`
      }}>
        <img src={config.logoUrl} alt="Logo" style={{ width: '160px', borderRadius: '50%', marginBottom: '20px', border: '3px solid #d4af37' }} />
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: 'bold'}}>{config.nombre}</h1>
        <p style={{letterSpacing: '3px', textTransform: 'uppercase'}}>Diseño y Planificación de Eventos Exclusivos</p>
        <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
          <a href="https://wa.me/18098372057" target="_blank" rel="noreferrer" style={{border: '2px solid #25d366', color: '#25d366', padding: '12px 25px', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>WhatsApp</a>
          <a href="https://instagram.com/joan_cuevas01" target="_blank" rel="noreferrer" style={{border: '2px solid #E1306C', color: '#E1306C', padding: '12px 25px', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>Instagram</a>
        </div>
      </header>

      {/* GALERÍA DE EVENTOS */}
      <section style={{padding: '60px 20px'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37', fontSize: '2.5rem', marginBottom: '40px'}}>EXPERIENCIAS DE LUJO</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto'}}>
          {eventos.map(ev => (
            <div key={ev._id} style={{background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333', textAlign: 'center'}}>
              <img src={ev.mediaUrl} alt={ev.nombre} style={{width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px'}} />
              <h3 style={{margin: '20px 0'}}>{ev.nombre}</h3>
              <button onClick={() => setSeleccionado(ev)} style={{background: '#d4af37', width: '100%', padding: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>VER DETALLES</button>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO DE CITAS (QUE TE HABÍA QUITADO) */}
      <section style={{padding: '80px 20px', background: '#0a0a0a'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37', marginBottom: '40px'}}>RESERVA TU FECHA</h2>
        <form onSubmit={enviarCita} style={{maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <input placeholder="Nombre Completo" value={fNombre} onChange={e => setFNombre(e.target.value)} required style={{padding: '15px', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: '5px'}} />
          <select value={fEvento} onChange={e => setFEvento(e.target.value)} style={{padding: '15px', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: '5px'}}>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="date" value={fFecha} onChange={e => setFFecha(e.target.value)} required style={{padding: '15px', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: '5px'}} />
          <input placeholder="WhatsApp" value={fTelefono} onChange={e => setFTelefono(e.target.value)} required style={{padding: '15px', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: '5px'}} />
          <button type="submit" style={{background: '#d4af37', color: 'black', padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'}}>ENVIAR SOLICITUD</button>
        </form>
      </section>

      {/* VENTANA DE DETALLES (OVERLAY) */}
      {seleccionado && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'}}>
          <div style={{background: '#111', padding: '30px', border: '1px solid #d4af37', maxWidth: '600px', width: '100%', textAlign: 'center', borderRadius: '15px', position: 'relative'}}>
            <button onClick={() => setSeleccionado(null)} style={{position: 'absolute', top: '10px', right: '20px', color: 'white', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer'}}>×</button>
            <h2 style={{color: '#d4af37', marginBottom: '20px'}}>{seleccionado.nombre}</h2>
            <img src={seleccionado.mediaUrl} style={{width: '100%', borderRadius: '10px', marginBottom: '20px'}} alt="evento"/>
            <button onClick={() => window.open(`https://wa.me/18098372057?text=Hola Joan, me interesa cotizar: ${seleccionado.nombre}`)} style={{width: '100%', padding: '15px', background: '#25d366', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>SOLICITAR POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publico;
