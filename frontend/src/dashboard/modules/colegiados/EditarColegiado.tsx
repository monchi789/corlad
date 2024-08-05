import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { getColegiadoById, updateColegiado } from "../../../api/colegiado.api";
import { getHistorialColegiadoById, updateHistorialColegiado } from "../../../api/historial.colegiado.api";
import { getAllEscuelas } from "../../../api/escuela.api";
import { getAllEspecialidades } from "../../../api/especialidad.api";
import toast, { Toaster } from "react-hot-toast";

export function EditarColegiado() {
  const { id1, id2 } = useParams();
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

  useEffect(() => {
    async function cargarDatosColegiado() {
      if (id1 && id2) {
        try {
          const resColegiado = await getColegiadoById(parseInt(id2));
          setColegiadoData(resColegiado.data);
          setImageUrl(import.meta.env.VITE_API_URL_ALTER + resColegiado.data.foto_colegiado);

          const resHistorialColegiado = await getHistorialColegiadoById(parseInt(id1));
          setHistorialData(resHistorialColegiado.data)

          setSelectedCapitulo(resHistorialColegiado.data.id_especialidad.id_escuela.id);
          setSelectedEspecialidad(resHistorialColegiado.data.id_especialidad.id);
        } catch (error) {
          console.error('Error al cargar datos del colegiado:', error);
          toast.error('Error al cargar datos del colegiado');
        }
      }
    }
    cargarDatosColegiado();
  }, [id1, id2]);


  // Maneja el cambio en los campos del formulario del colegiado
  const handleChangeColegiado = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  // Alterna el estado del colegiado entre hábil y no hábil
  const toggleEstado = () => {
    setColegiadoData(prevState => ({
      ...prevState,
      estado: !prevState.estado
    }));
  };

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
  const itemCategoria = (option: any) => {
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
      const value = data[key as keyof Colegiado];
      
      if (key === 'foto_colegiado' && value instanceof File) {
        formData.append(key, value, value.name);
      } else if (key !== 'foto_colegiado') {
        formData.append(key, String(value));
      }
    });
    return formData;
  };
  

  // Maneja el envío del formulario para crear un colegiado y su historial
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = convertToFormData(colegiadoData);

    try {
      await updateColegiado(parseInt(id2!), formData);

      const filteredEspecialidad = especialidadData.filter(especialidad => especialidad.id === selectedEspecialidad);
      historialData.id_especialidad = filteredEspecialidad[0];

      await updateHistorialColegiado(historialData.id, historialData);

      toast.success('Colegiado actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar colegiado:', error);
      toast.error('Error al actualizar colegiado');
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
      <div className="w-full lg:w-4/5 m-3 p-3">
        <SessionHeader />
        <form className="flex flex-col w-full space-x-5 mt-10" onSubmit={handleSubmit}>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold mb-5">Editar colegiado</h4>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/4">
              <img className="w-5/6 mt-5" src={imageUrl} alt="Perfil colegiado" />
              <button
                type="button"
                className="flex flex-row justify-between bg-[#5F4102] text-start text-[#F1E9D0] font-nunito font-extrabold rounded-md py-2 px-3 mt-10"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/4">
                      <label htmlFor="sexo_colegiado" className="block mb-1">Sexo</label>
                      <input
                        type="text"
                        id="sexo_colegiado"
                        name="sexo_colegiado"
                        value={colegiadoData.sexo_colegiado}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>

                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-2/5">
                      <label htmlFor="direccion" className="block mb-1">Dirección</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={colegiadoData.direccion}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/5">
                      <label htmlFor="celular" className="block mb-1">N° de Celular</label>
                      <input
                        type="text"
                        id="celular"
                        name="celular"
                        value={colegiadoData.celular}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/5">
                      <label htmlFor="estado_civil" className="block mb-1">Estado Civil</label>
                      <input
                        type="text"
                        id="estado_civil"
                        name="estado_civil"
                        value={colegiadoData.estado_civil}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>

                    <div className="w-1/5 flex flex-col my-auto">
                      <label htmlFor="estado" className="block mb-1">Estado</label>
                      <input type="button" onClick={toggleEstado} value={colegiadoData.estado ? "Hábil" : "No Hábil"} className={`py-1 px-4 rounded-xl ${colegiadoData.estado ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#C9D9C6] text-[#3A3A3A] rounded-2xl px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3">
                      <label htmlFor="numero_colegiatura" className="block mb-1">N° Colegiatura</label>
                      <input
                        type="text"
                        id="numero_colegiatura"
                        name="numero_colegiatura"
                        value={colegiadoData.numero_colegiatura}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8]  rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="numero_regulacion" className="block mb-1">N° de regulación</label>
                      <input
                        type="text"
                        id="numero_regulacion"
                        name="numero_regulacion"
                        value={colegiadoData.numero_regulacion}
                        onChange={handleChangeColegiado}
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="capitulo" className="block mb-1">Capitulo</label>
                      <Dropdown
                        id="capitulo"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                        value={selectedCapitulo}
                        onChange={(e) => setSelectedCapitulo(e.value)}
                        options={escuelaData}
                        optionLabel="label"
                        placeholder="Elegir capitulo..."
                        itemTemplate={itemCategoria}
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="especialidad" className="block mb-1">Especialidad</label>
                      <Dropdown
                        id="especialidad"
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
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
                        className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none p-1 px-2"
                        required
                      />
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full text-[#3A3A3A] rounded-2xl space-x-3 mt-5">
                <button type="submit" className="w-2/3 font-nunito font-black bg-[#007336] text-[#F9ECD9] rounded-2xl p-3">Actualizar Colegiado</button>
                <button type="button" className="w-1/3 font-nunito font-black border-solid border-2 border-[#3A3A3A] rounded-2xl"><Link to={"/admin/colegiado"}>Cancelar</Link></button>
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
