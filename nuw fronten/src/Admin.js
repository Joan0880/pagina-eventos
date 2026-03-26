import React, { useState, useEffect } from 'react';

function Admin() {
  const [estaAutorizado, setEstaAutorizado] = useState(false);
  const [password, setPassword] = useState('');
  const [eventos, setEventos] = useState([]);
  const [citas, setCitas] = useState([]);

  // Estados Portada
  const [nombreWeb, setNombreWeb] = useState('');
  const [urlWeb, setUrlWeb] = useState('');
  const [portadaVideo, setPortadaVideo] = useState(false);

  // Estados Catálogo
  const [nombreEv, setNombreEv] = useState('');
  const [urlEv, setUrlEv] = useState('');

  // ESTA ES LA URL DE TU BACKEND EN RENDER
  const API_URL = "https://pagina-eventos-backend.onrender.com";

  const cargarDatos = async () => {
    try {
      const resEv = await fetch(`${API_URL}/ver-eventos`);
      setEventos(await resEv.json());
      const resCitas = await fetch(`${API_URL}/ver-citas`);
      setCitas(await resCitas.json());
      const resP = await fetch(`${API_URL}/ver-portada`);
      const dP = await resP.json();
      setNombreWeb(dP.nombre); setUrlWeb(dP.mediaUrl); setPortadaVideo(dP.esVideo);
    } catch (e) { console.log("Error cargando datos:", e); }
  };

  useEffect(() => { if (estaAutorizado) cargarDatos(); }, [estaAutorizado]);

  const guardarPortada = async () => {
    await fetch(`${API_URL}/config-portada`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreWeb, mediaUrl: urlWeb, esVideo: portadaVideo })
    });
    alert("¡Configuración Guardada! Refresca la página principal.");
  };

  const guardarEvento = async () => {
    await fetch(`${API_URL}/eventos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEv, mediaUrl: urlEv, esVideo: false })
    });
    setNombreEv(''); setUrlEv(''); cargarDatos();
    alert("Evento añadido.");
  };

  const borrarCita = async (id) => { 
    if(window.confirm('¿Borrar cita?')){ 
      await fetch(`${API_URL}/citas/${id}`, {method: 'DELETE'}); 
      cargarDatos(); 
    } 
  };

  const borrarEvento = async (id) => { 
    if(window.confirm('¿Borrar evento?')){ 
      await fetch(`${API_URL}/eventos/${id}`, {method: 'DELETE'}); 
      cargarDatos(); 
    } 
  };

  if (!estaAutorizado) return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', flexDirection: 'column' }}>
      <h2 style={{color: '#d4af37'}}>🔐 Acceso Administrativo - ESTEISY</h2>
      <input type="password" placeholder="Clave..." onChange={e => setPassword(e.target.value)} style={{padding: '12px', margin: '15px', borderRadius: '5px', border: 'none'}} />
      <button onClick={() => password === "joan123" ? setEstaAutorizado(true) : alert("Clave Incorrecta")} style={{padding: '12px 30px', background: '#d4af37', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>ENTRAR AL PANEL</button>
      <br/>
      <a href="/" style={{color: 'gray', textDecoration: 'none'}}>Volver a la web</a>
    </div>
  );

  return (
    <div style={{ padding: '40px', background: '#000', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #d4af37', marginBottom: '30px', paddingBottom: '10px'}}>
        <h1 style={{color: '#d4af37', margin: 0}}>ADMIN - ESTEISY EVENTS</h1>
        <button onClick={() => setEstaAutorizado(false)} style={{background: 'red', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer'}}>Cerrar Sesión</button>
      </div>

      {/* SECCIÓN 1: CONFIGURACIÓN GENERAL */}
      <section style={{ background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid #333', marginBottom: '40px' }}>
        <h2 style={{color: '#d4af37', marginTop: 0}}>⚙️ Configuración General (Fondo y Nombre)</h2>
        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <input value={nombreWeb} placeholder="Nombre del Negocio" onChange={e => setNombreWeb(e.target.value)} style={{padding: '10px', background: '#222', color: 'white', border: '1px solid #444', flex: 1}} />
          <input value={urlWeb} placeholder="URL de la Foto de Fondo" onChange={e => setUrlWeb(e.target.value)} style={{padding: '10px', background: '#222', color: 'white', border: '1px solid #444', flex: 2}} />
          <button onClick={guardarPortada} style={{background: '#d4af37', border: 'none', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>GUARDAR CAMBIOS</button>
        </div>
      </section>

      {/* SECCIÓN 2: CITAS RECIBIDAS */}
      <section style={{marginBottom: '40px'}}>
        <h2 style={{color: '#d4af37'}}>📅 Citas de Clientes ({citas.length})</h2>
        <div style={{background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333'}}>
          {citas.length === 0 ? <p>No hay citas registradas todavía.</p> : citas.map(c => (
            <div key={c._id} style={{display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #222'}}>
              <span><strong>{c.nombre}</strong> - {c.evento} - {c.fecha} - <a href={`https://wa.me/${c.telefono}`} target="_blank" rel="noreferrer" style={{color: '#25d366'}}>{c.telefono}</a></span>
              <button onClick={() => borrarCita(c._id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>BORRAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: CATÁLOGO */}
      <section>
        <h2 style={{color: '#d4af37'}}>🖼️ Gestión de Fotos de Eventos</h2>
        <div style={{background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid #333', marginBottom: '20px', display: 'flex', gap: '10px'}}>
          <input value={nombreEv} placeholder="Título del Evento" onChange={e => setNombreEv(e.target.value)} style={{padding: '10px', background: '#222', color: 'white', border: '1px solid #444'}} />
          <input value={urlEv} placeholder="URL de la Foto" onChange={e => setUrlEv(e.target.value)} style={{padding: '10px', background: '#222', color: 'white', border: '1px solid #444', flex: 1}} />
          <button onClick={guardarEvento} style={{background: '#d4af37', padding: '10px 25px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px'}}>AÑADIR FOTO</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px'}}>
          {eventos.map(ev => (
            <div key={ev._id} style={{background: '#111', padding: '15px', textAlign: 'center', borderRadius: '10px', border: '1px solid #333'}}>
              <img src={ev.mediaUrl} style={{width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px'}} alt="img" />
              <p style={{margin: '10px 0'}}>{ev.nombre}</p>
              <button onClick={() => borrarEvento(ev._id)} style={{color: '#ff4d4d', cursor: 'pointer', background: 'none', border: '1px solid #ff4d4d', padding: '5px 15px', borderRadius: '5px'}}>ELIMINAR</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;
