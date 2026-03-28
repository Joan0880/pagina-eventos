import React, { useState, useEffect } from 'react';

function Publico() {
  const [eventos, setEventos] = useState([]);
  const [portada, setPortada] = useState({
    nombre: "ESTEISY EVENTS",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552",
    esVideo: false
  });

  // Estado para el formulario
  const [form, setForm] = useState({ nombre: '', telefono: '', tipoEvento: '' });

  const API_URL = "https://pagina-eventos-backend.onrender.com";
  const MI_WHATSAPP = "1809XXXXXXX"; // <--- PON TU NÚMERO AQUÍ JOAN

  useEffect(() => {
    fetch(`${API_URL}/ver-eventos`).then(res => res.json()).then(data => { if(Array.isArray(data)) setEventos(data); });
    fetch(`${API_URL}/ver-portada`).then(res => res.json()).then(data => { if(data && data.nombre) setPortada(data); });
  }, []);

  const enviarCotizacion = async (e) => {
    e.preventDefault();
    
    // 1. Guardar en Base de Datos para el Panel de Admin
    try {
      await fetch(`${API_URL}/nueva-cita`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } catch (err) { console.log("Error guardando en BD"); }

    // 2. Enviar por WhatsApp automáticamente
    const mensaje = `¡Hola Esteisy Events! Quiero una cotización.%0A*Nombre:* ${form.nombre}%0A*Teléfono:* ${form.telefono}%0A*Evento:* ${form.tipoEvento}`;
    window.open(`https://wa.me/${MI_WHATSAPP}?text=${mensaje}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* PORTADA */}
      <header style={{ height: '100vh', backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${portada.mediaUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', color: '#d4af37', letterSpacing: '5px' }}>{portada.nombre}</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Experiencias inolvidables en RD.</p>
        <a href="#contacto" style={{ marginTop: '30px', padding: '15px 40px', background: '#d4af37', color: 'black', fontWeight: 'bold', textDecoration: 'none', borderRadius: '50px' }}>RESERVAR AHORA</a>
      </header>

      {/* GALERÍA (ESTO CONECTA CON EL ADMIN) */}
      <section style={{ padding: '80px 5%' }}>
        <h2 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '40px' }}>Galería de Eventos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {eventos.map(ev => (
            <div key={ev._id} style={{ borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <img src={ev.mediaUrl} style={{ width: '100%', height: '350px', objectFit: 'cover' }} alt={ev.nombre} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '20px' }}>
                <h4 style={{ margin: 0 }}>{ev.nombre}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO CONECTADO A TODO */}
      <section id="contacto" style={{ padding: '100px 20px', background: '#000' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', padding: '40px', borderRadius: '20px', border: '1px solid #d4af37' }}>
          <h2 style={{ textAlign: 'center', color: '#d4af37' }}>Solicita tu Cotización</h2>
          <form onSubmit={enviarCotizacion} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input required placeholder="Nombre Completo" onChange={e => setForm({...form, nombre: e.target.value})} style={{ padding: '15px', background: '#222', border: 'none', color: 'white', borderRadius: '8px' }} />
            <input required placeholder="Teléfono" onChange={e => setForm({...form, telefono: e.target.value})} style={{ padding: '15px', background: '#222', border: 'none', color: 'white', borderRadius: '8px' }} />
            <select required onChange={e => setForm({...form, tipoEvento: e.target.value})} style={{ padding: '15px', background: '#222', border: 'none', color: '#888', borderRadius: '8px' }}>
              <option value="">Tipo de Evento</option>
              <option value="Boda">Boda</option>
              <option value="XV Años">XV Años</option>
              <option value="Corporativo">Corporativo</option>
            </select>
            <button type="submit" style={{ padding: '15px', background: '#d4af37', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>ENVIAR INFORMACIÓN</button>
          </form>
        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <a href={`https://wa.me/${MI_WHATSAPP}`} target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25d366', color: 'white', padding: '20px', borderRadius: '50%', zIndex: 1000 }}>WS</a>
    </div>
  );
}

export default Publico;
