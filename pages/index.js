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
        Producto Integrador | Conceptualización de servicios en la nube | Profesor Miguel Gárate Kelly<br />
        César Castellanos Robert | Código: 222958852 | Licenciatura en Desarrollo de Sistemas Web
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
};
