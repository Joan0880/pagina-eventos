import React, { useState, useEffect } from 'react';
import './App.css';

function Publico() {
  const [eventos, setEventos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [config, setConfig] = useState({ nombre: "Esteisy-Events", mediaUrl: "", esVideo: false });
  
  // Estados del Formulario de Citas
  const [fNombre, setFNombre] = useState('');
  const [fEvento, setFEvento] = useState('Boda');
  const [fFecha, setFFecha] = useState('');
  const [fTelefono, setFTelefono] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/ver-portada').then(res => res.json()).then(data => setConfig(data));
    fetch('http://localhost:5000/ver-eventos').then(res => res.json()).then(data => setEventos(data));
  }, []);

  const enviarCita = async (e) => {
    e.preventDefault();
    const datos = { nombre: fNombre, evento: fEvento, fecha: fFecha, telefono: fTelefono };
    const res = await fetch('http://localhost:5000/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      alert("¡Cita enviada! Joan se pondrá en contacto pronto.");
      setFNombre(''); setFFecha(''); setFTelefono('');
    }
  };

  const heroStyle = {
    position: 'relative', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    background: config.esVideo ? 'black' : `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${config.mediaUrl}) no-repeat center center/cover`
  };

  return (
    <div className="App">
      <header className="Hero" style={heroStyle}>
        {config.esVideo && <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}><source src={config.mediaUrl} type="video/mp4" /></video>}
        <div className="Hero-content" style={{ zIndex: '1' }}>
          <h1>{config.nombre}</h1>
          <p>Diseño y Planificación de Eventos Exclusivos</p>
          <div className="Social-Buttons" style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'}}>
            <a href="https://wa.me/18098372057" target="_blank" className="Btn-Whatsapp" style={{border: '2px solid #25d366', color: '#25d366', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" alt="wa"/> WhatsApp
            </a>
            <a href="https://instagram.com/joan_cuevas01" target="_blank" className="Btn-Instagram" style={{border: '2px solid #E1306C', color: '#E1306C', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" width="20" alt="ig"/> Instagram
            </a>
          </div>
        </div>
      </header>

      <section className="Gallery-Section" style={{padding: '60px 20px'}}>
        <h2>Experiencias de Lujo</h2>
        <div className="Gallery-Grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto'}}>
          {eventos.map(ev => (
            <div key={ev._id} className="Event-Card" style={{background: '#1a1a1a', padding: '15px', border: '1px solid #333'}}>
              <img src={ev.mediaUrl} alt={ev.nombre} style={{width: '100%', height: '220px', objectFit: 'cover'}} />
              <h3 style={{color: 'white', margin: '15px 0'}}>{ev.nombre}</h3>
              <button className="Btn-Cotizar" onClick={() => setSeleccionado(ev)} style={{background: '#d4af37', width: '100%', padding: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>VER DETALLES</button>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO DE CITAS */}
      <section className="Citas-Section" style={{padding: '60px 20px', background: '#111'}}>
        <h2 style={{textAlign: 'center', color: '#d4af37'}}>Reserva tu Fecha</h2>
        <form onSubmit={enviarCita} style={{maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <input placeholder="Nombre Completo" value={fNombre} onChange={e => setFNombre(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444'}} />
          <select value={fEvento} onChange={e => setFEvento(e.target.value)} style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444'}}>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="date" value={fFecha} onChange={e => setFFecha(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444'}} />
          <input placeholder="Teléfono / WhatsApp" value={fTelefono} onChange={e => setFTelefono(e.target.value)} required style={{padding: '12px', background: '#222', color: 'white', border: '1px solid #444'}} />
          <button type="submit" style={{background: '#d4af37', color: 'black', padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>ENVIAR SOLICITUD</button>
        </form>
      </section>

      {seleccionado && (
        <div className="Cotizador-Overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: '#1a1a1a', padding: '30px', border: '1px solid #d4af37', width: '90%', maxWidth: '700px', textAlign: 'center'}}>
            <button onClick={() => setSeleccionado(null)} style={{float: 'right', color: 'white', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}>X</button>
            <h2 style={{color: '#d4af37'}}>{seleccionado.nombre}</h2>
            <img src={seleccionado.mediaUrl} style={{width: '100%', maxHeight: '400px', objectFit: 'contain', margin: '20px 0'}} alt="media"/>
            <button style={{width: '100%', padding: '15px', background: '#25d366', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer'}} onClick={() => window.location.href=`https://wa.me/18098372057?text=Me interesa el evento: ${seleccionado.nombre}`}>CONSULTAR POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Publico;
