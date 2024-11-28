const Facturas = () => {
    return (
      <div className="p-4">
        {/* Título "Facturas" */}
        <h2 className="text-2xl font-bold mb-4">Facturas</h2>
  
        {/* Buscador y botón de crear factura */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar facturas..."
            className="p-2 border rounded"
          />
          <button
            onClick={() => window.open('/crear-factura', '_blank')}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Crear Factura
          </button>
        </div>
      </div>
    );
  };
  
  export default Facturas;
  