import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Facturas</h2>

        {/* Buscador y botón para crear factura */}
        <div className="flex mb-6 items-center">
          <input
            type="text"
            placeholder="Buscar factura..."
            className="p-2 border border-gray-300 rounded-l-md w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md ml-2">
            Crear factura
          </button>
        </div>

        {/* Tabla de facturas */}
        <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Correo Electrónico</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí es donde se mostrarían las filas de las facturas */}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        Producto Integrador | Conceptualización de servicios en la nube | Profesor Miguel Gárate Kelly
        <br />
        César Castellanos Robert | Código: 222958852 | Licenciatura en Desarrollo de Sistemas Web
      </footer>
    </div>
  );
};

export default Home;
