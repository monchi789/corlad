import { useEffect, useRef, useState } from "react";
import colegiado_default from "../../../../assets/dashboard/person_perfil.webp"
import { Dropdown } from "primereact/dropdown";
import { RiImageAddFill } from "react-icons/ri";
import { Colegiado, defaultColegiado } from "../../../../interfaces/model/Colegiado";
import { Especialidad } from "../../../../interfaces/model/Especialidad";
import { Escuela } from "../../../../interfaces/model/Escuela";
import { HistorialColegiado, defaultHistorialColegiado } from "../../../../interfaces/model/HistorialColegiado";
import { createColegiado, deleteColegiadoById } from "../../../../api/colegiado.api";
import { createHistorialColegiado } from "../../../../api/historial.colegiado.api";
import { getAllEscuelas } from "../../../../api/escuela.api";
import { getAllEspecialidades } from "../../../../api/especialidad.api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { FaArrowCircleLeft } from "react-icons/fa";
import FormHeader from "./components/FormHeader";
import ImageUploader from "./components/ImageUploader";

export default function AgregarColegiado() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  const [selectedCapitulo, setSelectedCapitulo] = useState<number | null>(null);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<number | null>(null);
  const [filteredEspecialidadData, setFilteredEspecialidadData] = useState<Especialidad[]>([]);

  const [colegiadoData, setColegiadoData] = useState<Colegiado>(defaultColegiado);
  const [escuelaData, setEscuelaData] = useState<Escuela[]>([]);
  const [especialidadData, setEspecialidadData] = useState<Especialidad[]>([]);
  const [historialData, setHistorialData] = useState<HistorialColegiado>(defaultHistorialColegiado);

  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(colegiado_default);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maneja el cambio en los campos del formulario del colegiado
  const handleChangeColegiado = (e: React.ChangeEvent<HTMLInputElement> | { name: string, value: any }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setColegiadoData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Maneja el cambio en los campos del formulario del historial del colegiado
  const handleChangeHistorial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHistorialData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Opciones de los dropdowns
  const optionsSexo = [
    { label: 'Masculino', value: "M" },
    { label: 'Femenino', value: "F" },
    { label: 'Otro', value: "O" }
  ];

  const optionsEstadoCivil = [
    { label: 'Soltero', value: "SOLTERO" },
    { label: 'Casado', value: "CASADO" },
    { label: 'Otro', value: "OTRO" }
  ];

  const optionsEstado = [
    { label: 'Activo', value: "ACTIVO" },
    { label: 'No Activo', value: "NO_ACTIVO" },
    { label: 'Fallecido', value: "FALLECIDO" },
    { label: 'Trasladado', value: "TRASLADADO" }
  ];

  // Carga la lista de escuelas al cargar el componente
  useEffect(() => {
    async function cargarEscuelas() {
      const res = await getAllEscuelas();
      const escuelasList: Escuela[] = res.data.map((element: Escuela) => ({
        label: element.nombre_escuela,
        value: element.id
      }));
      setEscuelaData(escuelasList);
    }
    cargarEscuelas();
  }, []);

  // Carga la lista de especialidades al cargar el componente
  useEffect(() => {
    async function cargarEspecialidades() {
      const res = await getAllEspecialidades();
      setEspecialidadData(res.data);
    }
    cargarEspecialidades();
  }, []);

  // Filtra las especialidades basadas en el capítulo seleccionado
  useEffect(() => {
    if (selectedCapitulo !== null) {
      const filtered = especialidadData.filter(especialidad => especialidad.id_escuela.id === selectedCapitulo);
      setFilteredEspecialidadData(filtered);
    } else {
      setFilteredEspecialidadData([]);
    }
  }, [selectedCapitulo, especialidadData]);

  // Renderiza cada item del dropdown de categoría
  const itemDropdown = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  // Abre el diálogo de selección de archivos
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Maneja el cambio en el input de archivos, actualizando la vista previa y el estado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setFileName(file.name);
      setColegiadoData(prevState => ({
        ...prevState,
        foto_colegiado: file
      }));
    }
  };

  // Convierte los datos del colegiado a un objeto FormData para poder enviar archivos
  const convertToFormData = (data: Colegiado) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'foto_colegiado') {
        const file = data[key as keyof Colegiado] as File | null;
        if (file) {
          formData.append(key, file, file.name);
        }
      } else {
        formData.append(key, String(data[key as keyof Colegiado]));
      }
    });
    return formData;
  };

  // Maneja el envío del formulario para crear un colegiado y su historial
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    const formData = convertToFormData(colegiadoData);

    try {
      if (selectedEspecialidad) {
        const filteredEspecialidad = especialidadData.filter(especialidad => especialidad.id === selectedEspecialidad);
        historialData.id_especialidad = filteredEspecialidad[0];
      }

      const colegiado = await createColegiado(formData);

      try {
        // Asociar historial al colegiado
        historialData.id_colegiado = colegiado.data;
        await createHistorialColegiado(historialData);

        // Operaciones exitosas
        toast.success('Colegiado creado exitosamente');
        setColegiadoData(defaultColegiado);
        setHistorialData(defaultHistorialColegiado);
        setSelectedCapitulo(null);
        setSelectedEspecialidad(null);
        setFileName(null);
        setImageUrl(colegiado_default);
        navigate("/admin/colegiado");
      } catch (error) {
        // Si falla la creación del historial, elimina el colegiado creado
        const res = await deleteColegiadoById(historialData.id_colegiado.id);
        console.log(res)
      }
    } catch (error: any) {
      if (error.response) {
        // Si el servidor respondió con un código de estado que no es 2xx
        const serverErrors = error.response.data;
        // Extrae los errores específicos y muéstralos
        if (serverErrors.dni_colegiado) {
          toast.error(`Error en DNI: ${serverErrors.dni_colegiado[0]}`);
        }
        if (serverErrors.numero_colegiatura) {
          toast.error(`Error en el número de colegiatura: ${serverErrors.numero_colegiatura[0]}`);
        }
        if (serverErrors.celular) {
          toast.error(`Error en el número de celular: ${serverErrors.celular[0]}`);
        }
        else {
          // Muestra otros errores generales
          toast.error(`Error del servidor: ${serverErrors.message || 'Error desconocido'}`);
        }

      } else if (error.request) {
        // Si no se recibió respuesta
        toast.error('No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        // Otros errores
        toast.error(`Error al crear colegiado: ${error.message}`);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl !== colegiado_default) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <>
      <form className="flex flex-col xl:flex-row w-full xl:space-x-5 space-y-5 xl:space-y-0" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full xl:w-1/4">
          <FormHeader title="Nuevo colegiado" />
          <div className="p-6">
            <div className="flex flex-col items-center">
              <img
                className="w-56 h-56 rounded-full object-cover border-4 border-green-100"
                src={imageUrl}
                alt="Perfil colegiado"
              />
              <button
                type="button"
                className="flex items-center justify-between w-full mt-6 bg-corlad hover:bg-green-700 text-white font-bold rounded-lg px-4 py-2 transition duration-200"
                onClick={handleFileButtonClick}
              >
                <span>Seleccionar archivo</span>
                <RiImageAddFill size="24" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-sm text-gray-600 mt-3">
                {fileName ? fileName : "Ningún archivo seleccionado"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-px bg-gray-200 mx-10"></div>

        <div className="flex flex-col w-full xl:w-3/4 overflow-y-auto px-5">
          <div className="text-default font-nunito font-bold">
            <div className="bg-light rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Datos personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">Nombres</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={colegiadoData.nombre}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="apellido_paterno" className="block text-sm font-semibold text-gray-700 mb-2">Apellido paterno</label>
                  <input
                    type="text"
                    id="apellido_paterno"
                    name="apellido_paterno"
                    value={colegiadoData.apellido_paterno}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="apellido_materno" className="block text-sm font-semibold text-gray-700 mb-2">Apellido materno</label>
                  <input
                    type="text"
                    id="apellido_materno"
                    name="apellido_materno"
                    value={colegiadoData.apellido_materno}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <label htmlFor="dni_colegiado" className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
                  <input
                    type="text"
                    id="dni_colegiado"
                    name="dni_colegiado"
                    value={colegiadoData.dni_colegiado}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fecha_nacimiento" className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    value={colegiadoData.fecha_nacimiento}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="sexo_colegiado" className="block text-sm font-semibold text-gray-700 mb-2">Sexo</label>
                  <Dropdown
                    id="sexo_colegiado"
                    name="sexo_colegiado"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2"
                    panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                    value={colegiadoData.sexo_colegiado}
                    onChange={(e) => handleChangeColegiado({ name: 'sexo_colegiado', value: e.value })}
                    options={optionsSexo}
                    placeholder="Elegir..."
                    itemTemplate={itemDropdown}
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={colegiadoData.correo}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={colegiadoData.direccion}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="estado_civil" className="block text-sm font-semibold text-gray-700 mb-2">Estado Civil</label>
                  <Dropdown
                    id="estado_civil"
                    name="estado_civil"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2"
                    panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                    value={colegiadoData.estado_civil}
                    onChange={(e) => handleChangeColegiado({ name: 'estado_civil', value: e.value })}
                    options={optionsEstadoCivil}
                    placeholder="Elegir..."
                    itemTemplate={itemDropdown}
                  />
                </div>
                <div>
                  <label htmlFor="estado_activo" className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                  <Dropdown
                    id="estado_activo"
                    name="estado_activo"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2"
                    panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                    value={colegiadoData.estado_activo}
                    onChange={(e) => {
                      handleChangeColegiado({ name: 'estado_activo', value: e.value });
                    }}
                    options={optionsEstado}
                    placeholder="Elegir..."
                    itemTemplate={itemDropdown}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-light rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Colegiatura</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="numero_colegiatura_anterior" className="block text-sm font-semibold text-gray-700 mb-2">N° de Colegiatura anterior</label>
                  <input
                    type="text"
                    id="numero_colegiatura_anterior"
                    name="numero_colegiatura_anterior"
                    value={colegiadoData.numero_colegiatura_anterior}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="numero_colegiatura" className="block text-sm font-semibold text-gray-700 mb-2">N° Colegiatura / REGUC</label>
                  <input
                    type="text"
                    id="numero_colegiatura"
                    name="numero_colegiatura"
                    value={colegiadoData.numero_colegiatura}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fecha_colegiatura" className="block text-sm font-semibold text-gray-700 mb-2">Fecha de colegiatura</label>
                  <input
                    type="date"
                    id="fecha_colegiatura"
                    name="fecha_colegiatura"
                    value={colegiadoData.fecha_colegiatura}
                    onChange={handleChangeColegiado}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="bg-light rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Historial educativo</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="universidad" className="block text-sm font-semibold text-gray-700 mb-2">Universidad</label>
                  <input
                    type="text"
                    id="universidad"
                    name="universidad"
                    value={historialData.universidad}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="capitulo" className="block text-sm font-semibold text-gray-700 mb-2">Capitulo</label>
                  <Dropdown
                    id="capitulo"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2"
                    panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                    value={selectedCapitulo}
                    onChange={(e) => setSelectedCapitulo(e.value)}
                    options={escuelaData}
                    optionLabel="label"
                    placeholder="Elegir capitulo..."
                    itemTemplate={itemDropdown}
                  />
                </div>
                <div>
                  <label htmlFor="especialidad" className="block text-sm font-semibold text-gray-700 mb-2">Especialidad</label>
                  <Dropdown
                    id="especialidad"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2"
                    panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                    value={selectedEspecialidad}
                    onChange={(e) => setSelectedEspecialidad(e.value)}
                    options={filteredEspecialidadData.map(especialidad => ({
                      label: especialidad.nombre_especialidad,
                      value: especialidad.id
                    }))}
                    optionLabel="label"
                    placeholder="Elegir especialidad..."
                    disabled={!selectedCapitulo}
                    itemTemplate={itemDropdown}
                  />
                </div>
                <div>
                  <label htmlFor="nombre_universidad_bachiller" className="block text-sm font-semibold text-gray-700 mb-2">Universidad bachiller</label>
                  <input
                    type="text"
                    id="nombre_universidad_bachiller"
                    name="nombre_universidad_bachiller"
                    value={historialData.nombre_universidad_bachiller}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="denominacion_bachiller" className="block text-sm font-semibold text-gray-700 mb-2">Denominación Bachiller</label>
                  <input
                    type="text"
                    id="denominacion_bachiller"
                    name="denominacion_bachiller"
                    value={historialData.denominacion_bachiller}
                    onChange={handleChangeHistorial}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="fecha_bachiller" className="block text-sm font-semibold text-gray-700 mb-2">Fecha bachiller</label>
                  <input
                    type="date"
                    id="fecha_bachiller"
                    name="fecha_bachiller"
                    value={historialData.fecha_bachiller}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="nombre_universidad_titulo" className="block text-sm font-semibold text-gray-700 mb-2">Universidad Título</label>
                  <input
                    type="text"
                    id="nombre_universidad_titulo"
                    name="nombre_universidad_titulo"
                    value={historialData.nombre_universidad_titulo}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="denominacion_titulo" className="block text-sm font-semibold text-gray-700 mb-2">Denominación titulo</label>
                  <input
                    type="text"
                    id="denominacion_titulo"
                    name="denominacion_titulo"
                    value={historialData.denominacion_titulo}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="titulo_fecha" className="block text-sm font-semibold text-gray-700 mb-2">Fecha titulo</label>
                  <input
                    type="date"
                    id="titulo_fecha"
                    name="titulo_fecha"
                    value={historialData.titulo_fecha}
                    onChange={handleChangeHistorial}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full text-[#3A3A3A] font-nunito font-bold rounded-2xl space-x-3">
            <button type="submit" className="w-2/3 bg-[#007336] hover:bg-[#00330A] transition duration-300 text-white rounded-xl p-3" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Agregar colegiado'}
            </button>
            <Link to={"/admin/colegiado"} className="w-1/3">
              <button type="button" className="w-full border-solid border-2 border-[#3A3A3A] hover:bg-[#3A3A3A] hover:border-[#3A3A3A] hover:text-white transition duration-300 rounded-xl py-3">
                Cancelar
              </button>
            </Link>
          </div>
          <Toaster
            position="bottom-center"
            reverseOrder={false} />
        </div>
      </form >
    </>
  )
} 
