import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFacturaById, updateFactura } from '../lib/supabase';

export default function EditarFactura() {
  const [cliente, setCliente] = useState('');
  const [celular, setCelular] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estatus, setEstatus] = useState('Pendiente');
  const [fecha, setFecha] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Captura el ID desde la URL

  // Cargar datos de la factura al montar el componente
  useEffect(() => {
    if (id) {
      const fetchFactura = async () => {
        try {
          const factura = await getFacturaById(parseInt(id));
          if (factura) {
            setCliente(factura.nombreCliente);
            setCelular(factura.celular);
            setCantidad(factura.cantidad);
            setEstatus(factura.estatus);
            setFecha(factura.fecha.split('T')[0]); // Formato YYYY-MM-DD
          } else {
            alert('Factura no encontrada.');
            router.push('/'); // Redirige a la tabla si no encuentra la factura
          }
        } catch (error) {
          console.error('Error al cargar la factura:', error);
          alert('Ocurrió un error al cargar la factura.');
          router.push('/'); // Redirige a la tabla si hay un error
        } finally {
          setIsLoading(false);
        }
      };
      fetchFactura();
    }
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas del formulario
    if (!fecha) {
      alert('Por favor, ingrese una fecha válida.');
      return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Por favor, ingrese una cantidad válida.');
      return;
    }

    const celularRegex = /^[0-9]{10}$/;
    if (!celularRegex.test(celular)) {
      alert('Por favor, ingrese un número de celular válido (10 dígitos).');
      return;
    }

    const facturaActualizada = {
      id: parseInt(id),
      nombreCliente: cliente,
      celular,
      cantidad: parseFloat(cantidad),
      estatus,
      fecha,
    };

    try {
      const success = await updateFactura(facturaActualizada);
      if (success) {
        alert('Factura actualizada exitosamente.');
        router.push('/'); // Redirige a la tabla de facturas
      } else {
        alert('Ocurrió un error al actualizar la factura.');
      }
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
    }
  };

  const handleCancel = () => {
    router.push('/'); // Redirige a la tabla de facturas
  };

  if (isLoading) {
    return <p>Cargando datos de la factura...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Editar Factura</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre del Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
            style={styles.input}
            maxLength="10"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cantidad (MXN)</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Estatus</label>
          <select
            value={estatus}
            onChange={(e) => setEstatus(e.target.value)}
            style={styles.select}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>
            Volver a Tabla
          </button>
          <button type="submit" style={styles.submitButton}>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
