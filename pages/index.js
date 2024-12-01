import { useEffect, useState } from 'react';
import { getFacturas } from '../lib/supabase';
import TablaFacturas from '../components/TablaFacturas';
import { useRouter } from 'next/router';

export default function Home() {
  const [facturas, setFacturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const facturasFromDb = await getFacturas();
      setFacturas(facturasFromDb);
    };

    fetchData();
  }, []);

  const filteredFacturas = facturas.filter((factura) =>
    factura.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header style={styles.header}>
        <img src="/logo.png" alt="Logotipo" style={styles.logo} />
        <h1 style={styles.title}>App de Control de Facturas</h1>
      </header>
      <main style={{ padding: '2rem' }}>
        <h2>Facturas</h2>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Buscar facturas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={() => router.push('/crear-factura')} style={styles.createButton}>
            Crear Factura
          </button>
        </div>
        <TablaFacturas facturas={filteredFacturas} />
      </main>
      <footer style={styles.footer}>
  {/* Redes Sociales */}
  <div style={styles.section}>
    <h4>Redes Sociales</h4>
    <div style={styles.iconsContainer}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/facebook.png" alt="Facebook" style={styles.icon} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/instagram.png" alt="Instagram" style={styles.icon} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/youtube.png" alt="YouTube" style={styles.icon} />
      </a>
    </div>
  </div>

  {/* Cloud Services */}
  <div style={styles.section}>
    <h4>Aprende más sobre Cloud Services:</h4>
    <div style={styles.iconsContainer}>
      <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/aws.png" alt="AWS" style={styles.icon} />
      </a>
      <a href="https://cloud.google.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/google.png" alt="Google Cloud" style={styles.icon} />
      </a>
      <a href="https://azure.microsoft.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/azure.png" alt="Microsoft Azure" style={styles.icon} />
      </a>
      <a href="https://www.ibm.com/cloud" target="_blank" rel="noopener noreferrer">
        <img src="/icons/ibm.png" alt="IBM Cloud" style={styles.icon} />
      </a>
      <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/ocean.png" alt="DigitalOcean" style={styles.icon} />
      </a>
      <a href="https://railway.app" target="_blank" rel="noopener noreferrer">
        <img src="/icons/railway.png" alt="Railway" style={styles.icon} />
      </a>
      <a href="https://render.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/render.png" alt="Render" style={styles.icon} />
      </a>
    </div>
  </div>

  {/* Información adicional */}
<div style={styles.additionalInfo}>
  Producto Integrador | Conceptualización de servicios en la nube | Profesor Miguel Gárate Kelly<br />
  César Castellanos Robert | Código: 222958852 | Licenciatura en Desarrollo de Sistemas Web
</div>
</footer>

    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#f0f0f0',
  },
  logo: {
    height: '50px',
  },
  title: {
    fontSize: '1.5rem',
    margin: 0,
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
  searchInput: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '70%',
  },
  createButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    background: '#f0f0f0',
    textAlign: 'center',
  },
  section: {
    marginBottom: '1rem',
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  icon: {
    width: '60px',
    height: '60px',
  }, 
  additionalInfo: {
    backgroundColor: '#333', // Gris oscuro
    color: 'white',          // Texto en blanco
    fontWeight: 'bold',      // Negritas
    padding: '1rem',         // Espaciado interno
    borderRadius: '5px',     // Bordes redondeados (opcional)
    textAlign: 'center',     // Centrar el texto
    marginTop: '1rem',       // Separación del contenido superior
  },
  
};

