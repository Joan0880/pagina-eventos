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
  const [evVideo, setEvVideo] = useState(false);

  const cargarDatos = async () => {
    try {
      const resEv = await fetch('http://localhost:5000/ver-eventos');
      setEventos(await resEv.json());
      const resCitas = await fetch('http://localhost:5000/ver-citas');
      setCitas(await resCitas.json());
      const resP = await fetch('http://localhost:5000/ver-portada');
      const dP = await resP.json();
      setNombreWeb(dP.nombre); setUrlWeb(dP.mediaUrl); setPortadaVideo(dP.esVideo);
    } catch (e) { console.log(e); }
  };

  useEffect(() => { if (estaAutorizado) cargarDatos(); }, [estaAutorizado]);

  const guardarPortada = async () => {
    await fetch('http://localhost:5000/config-portada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreWeb, mediaUrl: urlWeb, esVideo: portadaVideo })
    });
    alert("¡Configuración Guardada! Refresca la página principal.");
  };

  const guardarEvento = async () => {
    await fetch('http://localhost:5000/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEv, mediaUrl: urlEv, esVideo: evVideo })
    });
    setNombreEv(''); setUrlEv(''); cargarDatos();
    alert("Evento añadido.");
  };

  const borrarCita = async (id) => { if(window.confirm('¿Borrar?')){ await fetch(`http://localhost:5000/citas/${id}`, {method: 'DELETE'}); cargarDatos(); } };
  const borrarEvento = async (id) => { if(window.confirm('¿Borrar?')){ await fetch(`http://localhost:5000/eventos/${id}`, {method: 'DELETE'}); cargarDatos(); } };

  if (!estaAutorizado) return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', flexDirection: 'column' }}>
      <h2>🔐 Acceso Administrativo</h2>
      <input type="password" placeholder="Clave..." onChange={e => setPassword(e.target.value)} style={{padding: '10px', margin: '10px'}} />
      <button onClick={() => password === "joan123" ? setEstaAutorizado(true) : alert("Clave Incorrecta")} style={{padding: '10px 20px', background: '#d4af37', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>ENTRAR</button>
    </div>
  );

  return (
    <div style={{ padding: '40px', background: '#111', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración - Joan Olla</h1>
      <button onClick={() => setEstaAutorizado(false)} style={{marginBottom: '30px'}}>Cerrar Sesión</button>

      {/* SECCIÓN 1: CONFIGURACIÓN GENERAL */}
      <section style={{ background: '#222', padding: '25px', borderRadius: '15px', border: '1px solid #d4af37', marginBottom: '40px' }}>
        <h2 style={{color: '#d4af37'}}>⚙️ Configuración de la Web</h2>
        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <input value={nombreWeb} placeholder="Nombre del Negocio" onChange={e => setNombreWeb(e.target.value)} style={{padding: '10px', width: '250px'}} />
          <input value={urlWeb} placeholder="URL Fondo (Imagen o Video)" onChange={e => setUrlWeb(e.target.value)} style={{padding: '10px', width: '350px'}} />
          <label><input type="checkbox" checked={portadaVideo} onChange={e => setPortadaVideo(e.target.checked)} /> ¿Es Video?</label>
          <button onClick={guardarPortada} style={{background: '#d4af37', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer'}}>GUARDAR CAMBIOS</button>
        </div>
      </section>

      {/* SECCIÓN 2: CITAS RECIBIDAS */}
      <section style={{marginBottom: '40px'}}>
        <h2 style={{color: '#d4af37'}}>📅 Citas Recibidas ({citas.length})</h2>
        <div style={{background: '#222', padding: '15px'}}>
          {citas.map(c => (
            <div key={c._id} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #444'}}>
              <span><strong>{c.nombre}</strong> - {c.evento} - {c.fecha} - <a href={`https://wa.me/${c.telefono}`} style={{color: '#25d366'}}>{c.telefono}</a></span>
              <button onClick={() => borrarCita(c._id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}>ELIMINAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: CATÁLOGO */}
      <section>
        <h2 style={{color: '#d4af37'}}>🖼️ Gestión de Catálogo</h2>
        <div style={{background: '#222', padding: '20px', marginBottom: '20px', display: 'flex', gap: '10px'}}>
          <input value={nombreEv} placeholder="Nombre Evento" onChange={e => setNombreEv(e.target.value)} style={{padding: '10px'}} />
          <input value={urlEv} placeholder="URL Foto/Video" onChange={e => setUrlEv(e.target.value)} style={{padding: '10px', width: '300px'}} />
          <button onClick={guardarEvento} style={{background: '#d4af37', padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>AÑADIR</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
          {eventos.map(ev => (
            <div key={ev._id} style={{background: '#222', padding: '10px', textAlign: 'center'}}>
              <img src={ev.mediaUrl} style={{width: '100%', height: '120px', objectFit: 'cover'}} alt="img" />
              <p>{ev.nombre}</p>
              <button onClick={() => borrarEvento(ev._id)} style={{color: 'red', cursor: 'pointer', background: 'none', border: '1px solid red'}}>BORRAR</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Admin;