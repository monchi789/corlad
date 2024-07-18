import { Divider } from "primereact/divider";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Colegiado, defaultColegiado } from "../../../interfaces/model/Colegiado";
import { useRef, useState } from "react";
import colegiado_default from "../../../assets/dashboard/person_perfil.webp"

export function AgregarColegiado() {
  const [colegiadoData, setColegiadoData] = useState<Colegiado>(defaultColegiado);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setColegiadoData({ ...colegiadoData, [name]: value });
  };

  const toggleEstado = () => {
    setColegiadoData(prevState => ({
      ...prevState,
      estado: !prevState.estado
    }));
  };

  // Para abrir la interfaz de archivos
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />
      <div className="w-3/4 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col w-full space-x-5 mt-5">
          <h4 className="text-4xl text-[#5F4102] font-nunito font-extrabold mb-5">Nuevo colegiado</h4>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/4 space-y-5">
              <img className="w-5/6" src={colegiado_default} alt="" />
              <span className="text-[#5F4102] font-nunito font-extrabold">Foto actual</span>
              <p>/media/pinterest/</p>
              <span className="text-[#5F4102] font-nunito font-extrabold">Modificar</span>
              <button
                type="button"
                className="bg-[#5F4102] text-start text-[#F1E9D0] font-nunito font-extrabold rounded-md p-2"
                onClick={handleFileButtonClick}
              >
                Seleccionar archivo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span>{fileName ? fileName : "Ningún archivo seleccionado"}</span>
            </div>
            <Divider layout="vertical" className="border border-solid mx-10" />
            <div className="flex flex-col w-3/4 me-5">
              <form className="text-[#5F4102] space-y-5" action="">
                <div className="bg-[#C9D9C6] rounded-2xl space-y-5 px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="apellido_paterno" className="block mb-1">Apellido paterno</label>
                      <input
                        type="text"
                        id="apellido_paterno"
                        name="apellido_paterno"
                        value={colegiadoData.apellido_paterno}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="apellido_materno" className="block mb-1">Apellido materno</label>
                      <input
                        type="text"
                        id="apellido_materno"
                        name="apellido_materno"
                        value={colegiadoData.apellido_materno}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="fecha_nacimiento" className="block mb-1">Fecha de Nacimiento</label>
                      <input
                        type="text"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        value={colegiadoData.fecha_nacimiento}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">Género</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">DNI</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/2 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">Dirección</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/2 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">Estado Civil</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                  </div>
                </div>


                <div className="bg-[#C9D9C6] text-[#5F4102] rounded-2xl px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">N° de Celular</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">Correo electrónico</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-row w-1/3 space-y-2 ">
                      <label htmlFor="estado" className="block mb-1">Estado</label>
                      <input type="button" onClick={toggleEstado} value={colegiadoData.estado ? "Hábil" : "No Hábil"} className={`py-2 px-4 rounded ${colegiadoData.estado ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}/>
                    </div>
                  </div>
                </div>

                <div className="bg-[#C9D9C6] text-[#5F4102] rounded-2xl px-5 py-4">
                  <div className="flex flex-row space-x-5">
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="fecha_colegiatura" className="block mb-1">Fecha de colegiatura</label>
                      <input
                        type="text"
                        id="fecha_colegiatura"
                        name="fecha_colegiatura"
                        value={colegiadoData.fecha_colegiatura}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">N° Colegiatura</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <label htmlFor="nombre" className="block mb-1">N° de regulación</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={colegiadoData.nombre}
                        onChange={handleChange}
                        className="w-full text-[#F1E9D0] bg-[#5F4102] rounded-xl focus:outline-none p-2"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full text-[#5F4102] rounded-2xl space-x-3 px-5 py-4">
                  <button type="submit" className="w-2/3 font-nunito font-black bg-[#00330A] text-[#F9ECD9] rounded-2xl p-3">Añadir Colegiado</button>
                  <button className="w-1/3 font-nunito font-black border-solid border-2 border-[#5F4102] rounded-2xl">Cancelar</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
