import React, { useState } from 'react';
import './App.css';

function Publico() {
  // Datos fijos para que la página funcione en internet sin errores
  const [config] = useState({ 
    nombre: "ESTEISY EVENTS & RENTALS", 
    // ESTA ES TU IMAGEN DE FONDO (El salón decorado)
    mediaUrl: "https://r-assets.render.com/imagetomedia_e09d57a3-e22d-48a0-ae28-4444e21a1170.jpg", 
    // ESTA ES LA IMAGEN DE TU LOGO (El círculo con borde de colores)
    logoUrl: "https://r-assets.render.com/imagetomedia_a2105151-5360-4416-8c46-d2495b45df86.png",
    esVideo: false 
  });

  const [eventos] = useState([
    { _id: '1', nombre: 'Boda de Ensueño', mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800' },
    { _id: '2', nombre: 'Cumpleaños Temático', mediaUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800' },
    { _id: '3', nombre: 'Baby Shower Coqueto', mediaUrl: 'https://images.unsplash.com/photo-1519225495810-753b31473e2e?q=80&w=800' }
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
    height: '90vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden',
    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${config.mediaUrl}) no-repeat center center/cover`
  };

  return (
    <div className="App" style={{background: '#000', color: 'white'}}>
      <header className="Hero" style={heroStyle}>
        <div className="Hero-content" style={{ zIndex: '1', textAlign: 'center' }}>
          
          {/* AQUÍ PUSE TU LOGO REDONDO */}
          <img 
            src={config.logoUrl} 
            alt="Logo Esteisy Events" 
            style={{ width: '150px', height: '150px', marginBottom: '20px', borderRadius: '50%' }}
          />

          <h1 style={{fontSize: '3.5rem', color: '#d4af37', marginBottom: '10px'}}>{config.nombre}</h1>
          <p style={{fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase'}}>Diseño y Planificación de Eventos Exclusivos</p>
          <div className="Social-Buttons" style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px'}}>
            <a href="https://wa.me/18098372057" target="_blank" rel="noreferrer" style={{border: '2px solid #25d366', color: '#25d366', padding: '10px 25px', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>
               WhatsApp
            </a>
            <a href="https://instagram.com/joan_cuevas01" target="_blank" rel="noreferrer" style={{border: '2px solid #E1306C', color: '#E1306C', padding: '10px 25px', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold'}}>
               Instagram
            </a>
          </div>
        </div>
      </header>

      <section className="Gallery-Section" style={{padding: '80px 20px'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37', marginBottom: '40px', fontSize: '2.5rem'}}>EXPERIENCIAS DE LUJO</h2>
        <div className="Gallery-Grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto'}}>
          {eventos.map(ev => (
            <div key={ev._id} className="Event-Card" style={{background: '#111', padding: '20px', border: '1px solid #333', borderRadius: '15px', overflow: 'hidden'}}>
              <img src={ev.mediaUrl} alt={ev.nombre} style={{width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px'}} />
              <h3 style={{color: 'white', margin: '20px 0', textAlign: 'center'}}>{ev.nombre}</h3>
              <button className="Btn-Cotizar" onClick={() => setSeleccionado(ev)} style={{background: '#d4af37', width: '100%', padding: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>VER DETALLES</button>
            </div>
          ))}
        </div>
      </section>

      <section className="Citas-Section" style={{padding: '80px 20px', background: '#0a0a0a'}}>
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

      {seleccionado && (
        <div className="Cotizador-Overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'}}>
          <div style={{background: '#111', padding: '30px', border: '1px solid #d4af37', maxWidth: '600px', width: '100%', textAlign: 'center', borderRadius: '15px'}}>
            <button onClick={() => setSeleccionado(null)} style={{float: 'right', color: 'white', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}>×</button>
            <h2 style={{color: '#d4af37', marginBottom: '20px'}}>{seleccionado.nombre}</h2>
            <img src={seleccionado.mediaUrl} style={{width: '100%', borderRadius: '10px', marginBottom: '20px'}} alt="media"/>
            <button style={{width: '100%', padding: '15px', background: '#25d366', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'}} onClick={() => window.open(`https://wa.me/18098372057?text=Me interesa el evento: ${seleccionado.nombre}`)}>SOLICITAR COTIZACIÓN POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publico;
