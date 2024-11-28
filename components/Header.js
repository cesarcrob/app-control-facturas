import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Logo en la esquina superior derecha */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      {/* Título */}
      <h1 className="text-xl font-bold">App de Control de Facturas</h1>
    </header>
  );
};

export default Header;
