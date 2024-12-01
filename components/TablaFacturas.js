import React, { useState } from 'react';
import { deleteFactura, updateFactura } from '../lib/supabase';
import { useRouter } from 'next/router';

const TablaFacturas = ({ facturas }) => {
  const [editingId, setEditingId] = useState(null); // Para saber qué factura estamos editando
  const [editValues, setEditValues] = useState({}); // Para almacenar los valores que se van a editar
  const router = useRouter();

  // Maneja la edición de una factura
  const handleEdit = (factura) => {
    setEditingId(factura.id);
    setEditValues({
      nombreCliente: factura.nombreCliente,
      celular: factura.celular,
      fecha: factura.fecha,
      cantidad: factura.cantidad,
      estatus: factura.estatus,
    });
  };

  // Maneja el cambio de los valores de la edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja la cancelación de la edición
  const handleCancel = () => {
    setEditingId(null); // Cancela la edición
    setEditValues({}); // Limpia los valores
  };

  // Maneja la actualización de la factura
  const handleSave = async (id) => {
    const success = await updateFactura(id, editValues);
    if (success) {
      alert('Factura actualizada correctamente.');
      setEditingId(null); // Finaliza la edición
      // Redirige para recargar la tabla
      router.push('/facturas'); // Cambia '/facturas' por la ruta de tu tabla
    }
  };

  // Función para actualizar la información sin recargar la página
  const handleUpdate = () => {
    // Aquí puedes agregar la lógica para actualizar la información, tal vez obtener los datos actualizados desde una API o re-renderizar.
    // En este caso, simplemente estamos llamando a `router.reload()` para forzar una recarga de la página.
    router.reload();
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
      const success = await deleteFactura(id);
      if (success) {
        alert('Factura eliminada correctamente.');
        router.reload();
      } else {
        alert('Hubo un error al eliminar la factura.');
      }
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Nombre del Cliente</th>
          <th style={styles.th}>Celular</th>
          <th style={styles.th}>Fecha</th>
          <th style={styles.th}>Cantidad</th>
          <th style={styles.th}>Estatus</th>
          <th style={styles.th}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {facturas.length > 0 ? (
          facturas.map((factura) => (
            <tr key={factura.id}>
              <td style={styles.td}>{factura.id}</td>
              {editingId === factura.id ? (
                <>
                  <td style={styles.td}>
                    <input
                      type="text"
                      name="nombreCliente"
                      value={editValues.nombreCliente}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      name="celular"
                      value={editValues.celular}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="date"
                      name="fecha"
                      value={editValues.fecha}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      name="cantidad"
                      value={editValues.cantidad}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <select
                      name="estatus"
                      value={editValues.estatus}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Pagado">Pagado</option>
                    </select>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleSave(factura.id)} style={styles.saveButton}>
                      Guardar
                    </button>
                    <button onClick={handleCancel} style={styles.cancelButton}>
                      Cancelar
                    </button>
                    <button onClick={handleUpdate} style={styles.updateButton}>
                      Actualizar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={styles.td}>{factura.nombreCliente}</td>
                  <td style={styles.td}>{factura.celular}</td>
                  <td style={styles.td}>{new Date(factura.fecha).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    {factura.cantidad.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                  </td>
                  <td style={styles.td}>{factura.estatus}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(factura)} style={styles.editButton}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(factura.id)} style={styles.deleteButton}>
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={styles.td}>
              No hay facturas disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  updateButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px', 
  },
  input: {
    padding: '5px',
    fontSize: '1rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};

export default TablaFacturas;
