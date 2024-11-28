const TablaFacturas = ({ facturas }) => {
    return (
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Cliente</th>
              <th className="border px-4 py-2">Correo electrónico</th>
              <th className="border px-4 py-2">Cantidad</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="border px-4 py-2">{factura.cliente}</td>
                <td className="border px-4 py-2">{factura.email}</td>
                <td className="border px-4 py-2">{factura.cantidad}</td>
                <td className="border px-4 py-2">{factura.fecha}</td>
                <td className="border px-4 py-2">{factura.estatus}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</button>
                  <button className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablaFacturas;
  