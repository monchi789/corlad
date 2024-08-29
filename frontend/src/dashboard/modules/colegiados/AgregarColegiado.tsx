import { useEffect, useRef, useState } from "react";
import colegiado_default from "../../../assets/dashboard/person_perfil.webp"
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { RiImageAddFill } from "react-icons/ri";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Colegiado, defaultColegiado } from "../../../interfaces/model/Colegiado";
import { Especialidad } from "../../../interfaces/model/Especialidad";
import { Escuela } from "../../../interfaces/model/Escuela";
import { HistorialColegiado, defaultHistorialColegiado } from "../../../interfaces/model/HistorialColegiado";
import { createColegiado } from "../../../api/colegiado.api";
import { createHistorialColegiado } from "../../../api/historial.colegiado.api";
import { getAllEscuelas } from "../../../api/escuela.api";
import { getAllEspecialidades } from "../../../api/especialidad.api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AgregarColegiado() {
  const navigate = useNavigate();

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
    const formData = convertToFormData(colegiadoData);

    try {
      const colegiado = await createColegiado(formData);

      historialData.id_colegiado = colegiado.data;

      const filteredEspecialidad = especialidadData.filter(especialidad => especialidad.id === selectedEspecialidad);

      historialData.id_especialidad = filteredEspecialidad[0];

      await createHistorialColegiado(historialData);

      toast.success('Colegiado creado exitosamente');
      setColegiadoData(defaultColegiado);
      setHistorialData(defaultHistorialColegiado);

      setSelectedCapitulo(null);
      setSelectedEspecialidad(null);

      setFileName(null);
      setImageUrl(colegiado_default);
      navigate("/admin/colegiado")
    } catch (error: any) {
      if (error.response) {
        // Si el servidor respondió con un código de estado que no es 2xx
        const serverErrors = error.response.data;
        console.log(error)
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
    }
  };

  // Revoca la URL de la imagen cuando el componente se desmonta o cambia la URL
  useEffect(() => {
    return () => {
      if (imageUrl !== colegiado_default) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-4/5 mx-3 p-3">
        <SessionHeader />
        <form className="flex flex-col w-full space-x-5 mt-10" onSubmit={handleSubmit}>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold mb-5">Nuevo colegiado</h4>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/4">
              <img className="w-5/6 mt-5" src={imageUrl} alt="Perfil colegiado" />
              <button
                type="button"
                className="flex flex-row justify-between bg-[#007336] text-start text-white font-nunito font-extrabold hover:bg-[#00330A] shadow-custom-input rounded-md transition duration-300 py-2 px-3 mt-10"
                onClick={handleFileButtonClick}
              >
                <span>Seleccionar archivo</span>
                <RiImageAddFill size={"25px"} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span className="mt-5">{fileName ? fileName : "Ningún archivo seleccionado"}</span>
            </div>
            <Divider layout="vertical" className="border border-solid mx-10" />
            <div className="flex flex-col w-3/4 me-5">
              <div className="text-[#3A3A3A] font-nunito font-bold space-y-3">
                <div className="bg-[#C9D9C6] rounded-2xl space-y-2 px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3">
                      <label htmlFor="nombre" className="block mb-1">Nombres</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="apellido_paterno" className="block mb-1">Apellido paterno</label>
                      <input
                        type="text"
                        id="apellido_paterno"
                        name="apellido_paterno"
                        value={colegiadoData.apellido_paterno}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="apellido_materno" className="block mb-1">Apellido materno</label>
                      <input
                        type="text"
                        id="apellido_materno"
                        name="apellido_materno"
                        value={colegiadoData.apellido_materno}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/4">
                      <label htmlFor="dni_colegiado" className="block mb-1">DNI</label>
                      <input
                        type="text"
                        id="dni_colegiado"
                        name="dni_colegiado"
                        value={colegiadoData.dni_colegiado}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="fecha_nacimiento" className="block mb-1">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        value={colegiadoData.fecha_nacimiento}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="sexo_colegiado" className="block mb-1">Sexo</label>
                      <Dropdown
                        id="sexo_colegiado"
                        name="sexo_colegiado"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                        value={colegiadoData.sexo_colegiado}
                        onChange={(e) => {
                          handleChangeColegiado({ name: 'sexo_colegiado', value: e.value });
                        }}
                        options={optionsSexo}
                        placeholder="Elegir..."
                        itemTemplate={itemDropdown}
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="correo" className="block mb-1">Correo electrónico</label>
                      <input
                        type="text"
                        id="correo"
                        name="correo"
                        value={colegiadoData.correo}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>

                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-2/4">
                      <label htmlFor="direccion" className="block mb-1">Dirección</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={colegiadoData.direccion}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="celular" className="block mb-1">N° de Celular</label>
                      <input
                        type="text"
                        id="celular"
                        name="celular"
                        value={colegiadoData.celular}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="estado_civil" className="block mb-1">Estado Civil</label>
                      <Dropdown
                        id="estado_civil"
                        name="estado_civil"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                        value={colegiadoData.estado_civil}
                        onChange={(e) => {
                          handleChangeColegiado({ name: 'estado_civil', value: e.value });
                        }}
                        options={optionsEstadoCivil}
                        placeholder="Elegir..."
                        itemTemplate={itemDropdown}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#C9D9C6] text-[#3A3A3A] rounded-2xl px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3">
                      <label htmlFor="numero_colegiatura_anterior" className="block mb-1">N° de Colegiatura anterior</label>
                      <input
                        type="text"
                        id="numero_colegiatura_anterior"
                        name="numero_colegiatura_anterior"
                        value={colegiadoData.numero_colegiatura_anterior}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="numero_colegiatura" className="block mb-1">N° Colegiatura</label>
                      <input
                        type="text"
                        id="numero_colegiatura"
                        name="numero_colegiatura"
                        value={colegiadoData.numero_colegiatura}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8]  rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="fecha_colegiatura" className="block mb-1">Fecha de colegiatura</label>
                      <input
                        type="date"
                        id="fecha_colegiatura"
                        name="fecha_colegiatura"
                        value={colegiadoData.fecha_colegiatura}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#C9D9C6] text-[#3A3A3A] rounded-2xl px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3">
                      <label htmlFor="universidad" className="block mb-1">Universidad</label>
                      <input
                        type="text"
                        id="universidad"
                        name="universidad"
                        value={historialData.universidad}
                        onChange={handleChangeHistorial}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="capitulo" className="block mb-1">Capitulo</label>
                      <Dropdown
                        id="capitulo"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                        value={selectedCapitulo}
                        onChange={(e) => setSelectedCapitulo(e.value)}
                        options={escuelaData}
                        optionLabel="label"
                        placeholder="Elegir capitulo..."
                        itemTemplate={itemDropdown}
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="especialidad" className="block mb-1">Especialidad</label>
                      <Dropdown
                        id="especialidad"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
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
                  </div>
                </div>

                <div className="bg-[#C9D9C6] text-[#3A3A3A] rounded-2xl space-y-2 px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/2">
                      <label htmlFor="denominacion_bachiller" className="block mb-1">Denominación Bachiller</label>
                      <input
                        type="text"
                        id="denominacion_bachiller"
                        name="denominacion_bachiller"
                        value={historialData.denominacion_bachiller}
                        onChange={handleChangeHistorial}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="fecha_bachiller" className="block mb-1">Fecha bachiller</label>
                      <input
                        type="date"
                        id="fecha_bachiller"
                        name="fecha_bachiller"
                        value={historialData.fecha_bachiller}
                        onChange={handleChangeHistorial}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/2">
                      <label htmlFor="denominacion_titulo" className="block mb-1">Denominación titulo</label>
                      <input
                        type="text"
                        id="denominacion_titulo"
                        name="denominacion_titulo"
                        value={historialData.denominacion_titulo}
                        onChange={handleChangeHistorial}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="titulo_fecha" className="block mb-1">Fecha titulo</label>
                      <input
                        type="date"
                        id="titulo_fecha"
                        name="titulo_fecha"
                        value={historialData.titulo_fecha}
                        onChange={handleChangeHistorial}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
                        required
                      />
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full text-[#3A3A3A] font-nunito font-black rounded-2xl space-x-3 mt-5">
                <button type="submit" className="w-2/3 bg-[#007336] text-white rounded-2xl p-3">Agregar colegiado</button>
                <Link to={"/admin/colegiado"} className="w-1/3">
                  <button type="button" className="w-full border-solid border-2 border-[#3A3A3A] rounded-2xl py-3">
                    Cancelar
                  </button>
                </Link>
              </div>
              <Toaster
                position="bottom-center"
                reverseOrder={false} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 
