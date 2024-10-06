import React, { useEffect, useState } from 'react';
import { getColegiadoByFilters } from '../../../../api/colegiado.api';
import { Colegiado } from '../../../../interfaces/model/Colegiado';
import Spinner from '../../components/ui/Spinner';

interface BuscarColegiadoProps {
  onColegiadoFound: (colegiado: Colegiado | null) => void;
  colegiado?: Colegiado;
}

const BuscarColegiado: React.FC<BuscarColegiadoProps> = ({ onColegiadoFound, colegiado }) => {
  const [dniColegiado, setDniColegiado] = useState('');
  const [numeroColegiatura, setNumeroColegiatura] = useState('');
  const [selectedColegiado, setSelectedColegiado] = useState<Colegiado | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorColegiado, setErrorColegiado] = useState(false);

  useEffect(() => {
    if (colegiado) setSelectedColegiado(colegiado)
  }, [colegiado])

  // Buscar al colegiado
  const handleSearch = async () => {
    if (dniColegiado.trim() === '' && numeroColegiatura.trim() === '') {
      setErrorColegiado(true);
      return;
    }

    setLoading(true);
    setErrorColegiado(false);

    try {
      const res = await getColegiadoByFilters(numeroColegiatura, dniColegiado);

      if (res.data.results.length > 0) {
        const foundColegiado: Colegiado = res.data.results[0];
        setSelectedColegiado(foundColegiado);
        onColegiadoFound(foundColegiado);
      } else {
        setSelectedColegiado(null);
        onColegiadoFound(null);
      }
    } catch (error) {
      setSelectedColegiado(null);
      onColegiadoFound(null);
      setErrorColegiado(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-dark-light-turquoise text-default-green rounded-2xl space-y-3 p-4 mb-5">
      <span className="text-xl font-nunito font-extrabold">Buscar colegiado:</span>
      <div className="flex flex-col">
        <div className="flex flex-row font-nunito font-bold space-x-7 mb-5">
          <input
            type="number"
            id="dni_colegiado"
            name="dni_colegiado"
            className="w-full bg-custom-light-turquoise focus:outline-none shadow-custom-input rounded-lg p-1 px-2"
            placeholder="Documento de identidad"
            value={dniColegiado}
            onChange={(e) => setDniColegiado(e.target.value)}
          />
          <span className="my-auto">y/o</span>
          <input
            type="number"
            id="numero_colegiatura"
            name="numero_colegiatura"
            className="w-full bg-custom-light-turquoise focus:outline-none shadow-custom-input rounded-lg p-1 px-2"
            placeholder="N° colegiatura"
            value={numeroColegiatura}
            onChange={(e) => setNumeroColegiatura(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="flex flex-row text-md text-white font-nunito font-semibold shadow-md rounded-lg bg-corlad hover:bg-hover-corlad transition duration-300 px-8 py-2"
          >
            Buscar
          </button>
        </div>
        <div className="mb-3">
          {loading && <Spinner />}
        </div>
        <input
          value={loading 
            ? "" 
            : selectedColegiado 
              ? `${selectedColegiado.numero_colegiatura} - ${selectedColegiado.apellido_paterno} - ${selectedColegiado.apellido_materno} - ${selectedColegiado.nombre} - ${selectedColegiado.dni_colegiado}`
              : "No se encontró ningún colegiado con esos parámetros"
          }
          className="bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-bold shadow-custom-input rounded-lg mb-3 p-2"
          placeholder="Colegiado que realizó el pago"
          disabled
        />
        {errorColegiado && (
          <p className="text-red-500 text-center font-nunito font-bold">
            Por favor buscar al colegiado que ingresó el pago
          </p>
        )}
      </div>
    </div>
  );
};

export default BuscarColegiado;