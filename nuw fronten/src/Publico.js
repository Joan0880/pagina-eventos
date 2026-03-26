import React, { useState } from 'react';
import './App.css';

function Publico() {
  // Datos fijos para que la página funcione en internet sin errores
  const [config] = useState({ 
    nombre: "Esteisy.Events", 
    mediaUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000", 
    esVideo: false 
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
    // Simulación de envío ya que no hay servidor activo en internet
    alert(`¡Solicitud recibida, ${fNombre}! Joan se pondrá en contacto contigo pronto por WhatsApp.`);
    setFNombre(''); setFFecha(''); setFTelefono('');
  };

  const heroStyle = {
    position: 'relative', 
    height: '70vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden',
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${config.mediaUrl}) no-repeat center center/cover`
  };

  return (
    <div className="App" style={{background: '#000', color: 'white'}}>
      <header className="Hero" style={heroStyle}>
        <div className="Hero-content" style={{ zIndex: '1', textAlign: 'center' }}>
          <h1 style={{fontSize: '3.5rem', color: '#d4af37'}}>{config.nombre}</h1>
          <p>Diseño y Planificación de Eventos Exclusivos</p>
          <div className="Social-Buttons" style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'}}>
            <a href="https://wa.me/18098372057" target="_blank" rel="noreferrer" style={{border: '2px solid #25d366', color: '#25d366', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold'}}>
               WhatsApp
            </a>
            <a href="https://instagram.com/joan_cuevas01" target="_blank" rel="noreferrer" style={{border: '2px solid #E1306C', color: '#E1306C', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold'}}>
               Instagram
            </a>
          </div>
        </div>
      </header>

      <section className="Gallery-Section" style={{padding: '60px 20px'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37', marginBottom: '30px'}}>Experiencias de Lujo</h2>
        <div className="Gallery-Grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto'}}>
          {eventos.map(ev => (
            <div key={ev._id} className="Event-Card" style={{background: '#1a1a1a', padding: '15px', border: '1px solid #333', borderRadius: '10px'}}>
              <img src={ev.mediaUrl} alt={ev.nombre} style={{width: '100%', height: '220px', objectFit: 'cover', borderRadius: '5px'}} />
              <h3 style={{color: 'white', margin: '15px 0', textAlign: 'center'}}>{ev.nombre}</h3>
              <button className="Btn-Cotizar" onClick={() => setSeleccionado(ev)} style={{background: '#d4af37', width: '100%', padding: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>VER DETALLES</button>
            </div>
          ))}
        </div>
      </section>

      <section className="Citas-Section" style={{padding: '60px 20px', background: '#111'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37', marginBottom: '30px'}}>Reserva tu Fecha</h2>
        <form onSubmit={enviarCita} style={{maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <input placeholder="Nombre Completo" value={fNombre} onChange={e => setFNombre(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px'}} />
          <select value={fEvento} onChange={e => setFEvento(e.target.value)} style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px'}}>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="date" value={fFecha} onChange={e => setFFecha(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px'}} />
          <input placeholder="Teléfono / WhatsApp" value={fTelefono} onChange={e => setFTelefono(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px'}} />
          <button type="submit" style={{background: '#d4af37', color: 'black', padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'}}>ENVIAR SOLICITUD</button>
        </form>
      </section>

      {seleccionado && (
        <div className="Cotizador-Overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: '#1a1a1a', padding: '30px', border: '1px solid #d4af37', width: '90%', maxWidth: '700px', textAlign: 'center', borderRadius: '15px'}}>
            <button onClick={() => setSeleccionado(null)} style={{float: 'right', color: 'white', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}>×</button>
            <h2 style={{color: '#d4af37'}}>{seleccionado.nombre}</h2>
            <img src={seleccionado.mediaUrl} style={{width: '100%', maxHeight: '400px', objectFit: 'contain', margin: '20px 0', borderRadius: '10px'}} alt="media"/>
            <button style={{width: '100%', padding: '15px', background: '#25d366', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'}} onClick={() => window.open(`https://wa.me/18098372057?text=Me interesa el evento: ${seleccionado.nombre}`)}>CONSULTAR POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publico;
