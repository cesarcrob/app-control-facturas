import { useState } from 'react';

const CrearFactura = () => {
  const [cliente, setCliente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estado, setEstado] = useState('Pendiente');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberíamos guardar la factura en la base de datos
    console.log({ cliente, cantidad, estado });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Crear Factura</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nombre del Cliente</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Cantidad</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Estatus de la Factura</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Crear Factura
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearFactura;
