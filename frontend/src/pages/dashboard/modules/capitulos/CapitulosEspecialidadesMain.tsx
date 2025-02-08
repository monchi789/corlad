import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { getAllEscuelas, getAllEspecialidades, deleteEscuela, deleteEspecialidad } from "../../../../api/escuela.api";
import { Escuela } from "../../../../interfaces/model/Escuela";
import { Especialidad } from "../../../../interfaces/model/Especialidad";
import AddCapituloModal from "./components/AddCapituloModal";
import AddEspecialidadModal from "./components/AddEspecialidadModal";
import EditCapituloModal from "./components/EditCapituloModal";
import EditEspecialidadModal from "./components/EditEspecialidadModal";
import contabilidad from '../../../../assets/dashboard/contabilidad.png';
import { IoMdAddCircleOutline } from "react-icons/io";

const CapitulosEspecialidadesMain = () => {
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);
  const [especialidadesList, setEspecialidadesList] = useState<Especialidad[]>([]);
  const [isEscuelaModalOpen, setIsEscuelaModalOpen] = useState(false);
  const [isEspecialidadModalOpen, setIsEspecialidadModalOpen] = useState(false);
  const [isEscuelaEditModalOpen, setIsEscuelaEditModalOpen] = useState(false);
  const [isEspecialidadEditModalOpen, setIsEspecialidadEditModalOpen] = useState(false);
  const [selectedEscuela, setSelectedEscuela] = useState<Escuela | null>(null);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<Especialidad | null>(null);
  const [searchTermEscuela, setSearchTermEscuela] = useState("");
  const [searchTermEspecialidad, setSearchTermEspecialidad] = useState("");
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [deleteEntityName, setDeleteEntityName] = useState(""); // Guarda el nombre de la entidad
  const [entityToDelete, setEntityToDelete] = useState<{ type: 'escuela' | 'especialidad'; id: number } | null>(null);

  const cargarDatos = async () => {
    const escuelasRes = await getAllEscuelas();
    setEscuelasList(escuelasRes.data as Escuela[]);

    const especialidadesRes = await getAllEspecialidades();
    setEspecialidadesList(especialidadesRes.data as Especialidad[]);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAddSchool = () => {
    setIsEscuelaModalOpen(true);
  };

  const handleAddSpecialty = () => {
    setIsEspecialidadModalOpen(true);
  };

  const handleEditSchool = (escuela: Escuela) => {
    setSelectedEscuela(escuela);
    setIsEscuelaEditModalOpen(true);
  };

  const handleEditSpecialty = (especialidad: Especialidad) => {
    setSelectedEspecialidad(especialidad);
    setIsEspecialidadEditModalOpen(true);
  };

  const handleCloseEscuelaModal = () => {
    setIsEscuelaModalOpen(false);
  };

  const handleCloseEspecialidadModal = () => {
    setIsEspecialidadModalOpen(false);
  };

  const handleCloseEscuelaEditModal = () => {
    setIsEscuelaEditModalOpen(false);
    setSelectedEscuela(null);
  };

  const handleCloseEspecialidadEditModal = () => {
    setIsEspecialidadEditModalOpen(false);
    setSelectedEspecialidad(null);
  };

  const handleOpenConfirmDeleteModal = (type: 'escuela' | 'especialidad', id: number, name: string) => {
    setEntityToDelete({ type, id });
    setDeleteEntityName(name);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setEntityToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (entityToDelete) {

      if (entityToDelete.type === 'escuela') {
        await deleteEscuela(entityToDelete.id);
      } else if (entityToDelete.type === 'especialidad') {
        await deleteEspecialidad(entityToDelete.id);
      }
      cargarDatos();
      handleCloseConfirmDeleteModal();
    }
  };

  const handleSearchChangeEscuela = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermEscuela(event.target.value);
  };

  const handleSearchChangeEspecialidad = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermEspecialidad(event.target.value);
  };

  const filteredEscuelas = escuelasList.filter((escuela) =>
    escuela.nombre_escuela.toLowerCase().includes(searchTermEscuela.toLowerCase())
  );

  const filteredEspecialidades = especialidadesList.filter((especialidad) =>
    especialidad.nombre_especialidad.toLowerCase().includes(searchTermEspecialidad.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8">

        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold w-full sm:w-auto text-center sm:text-left">
            Capítulos
          </h4>
          <div className="flex flex-wrap items-center justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar capítulo"
              value={searchTermEscuela}
              onChange={handleSearchChangeEscuela}
              className="w-full sm:w-auto text-default font-nunito font-semibold bg-default-input border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent placeholder-[#007336] px-5 py-2"
              required
            />
            <button
              className="flex items-center text-lg text-white font-nunito font-semibold bg-best-green hover:bg-green-600 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 space-x-2 px-6 py-2 w-full sm:w-auto justify-center"
              onClick={handleAddSchool}
            >
              <IoMdAddCircleOutline size={"25px"} />
              <span>Nuevo capítulo</span>
            </button>
          </div>
        </div>

        <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 mt-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEscuelas.length > 0 ? (
              filteredEscuelas.map((escuela, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-md hover:shadow-xl text-center transition duration-300 ease-in-out hover:bg-corlad hover:text-white group p-6"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-[#458050] bg-opacity-80 rounded-lg">
                    <button className="text-xl text-white mx-2" onClick={() => handleEditSchool(escuela)}>
                      <FaEdit />
                    </button>
                    <button className="text-xl text-white mx-2" onClick={() => handleOpenConfirmDeleteModal('escuela', escuela.id, escuela.nombre_escuela)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                  <img src={contabilidad} alt="Contabilidad" className="mx-auto mb-4 w-24 h-24 rounded-full border-4 border-white shadow-md" />
                  <h5 className="text-xl font-bold font-nunito-sans text-[#00330A] group-hover:text-white">
                    {escuela.nombre_escuela}
                  </h5>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-lg font-semibold text-[#7A7A7A]">No hay capítulos disponibles.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-10 mb-6 gap-4">
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold w-full sm:w-auto text-center sm:text-left">
            Especialidades
          </h4>
          <div className="flex flex-wrap items-center justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar especialidad"
              value={searchTermEspecialidad}
              onChange={handleSearchChangeEspecialidad}
              className="w-full sm:w-auto text-default font-nunito font-semibold bg-default-input border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent placeholder-[#007336] px-5 py-2"
              required
            />
            <button
              className="flex items-center text-lg text-white font-nunito font-semibold bg-best-green hover:bg-green-600 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 space-x-2 px-6 py-2 w-full sm:w-auto justify-center"
              onClick={handleAddSpecialty}
            >
              <IoMdAddCircleOutline size={"25px"} />
              <span>Agregar especialidad</span>
            </button>
          </div>
        </div>

        <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 mt-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEspecialidades.length > 0 ? (
              filteredEspecialidades.map((especialidad, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center relative text-default hover:text-white bg-white hover:bg-best-green rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-5"
                  style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                >
                  <div>
                    <h5 className="text-xl font-bold font-nunito-sans">
                      {especialidad.nombre_especialidad}
                    </h5>
                    <p className="text-sm font-semibold font-nunito-sans">
                      Capítulo: {especialidad.id_escuela.nombre_escuela}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button className="text-xl mx-2" onClick={() => handleEditSpecialty(especialidad)}>
                      <FaEdit />
                    </button>
                    <button className="text-xl mx-2" onClick={() => handleOpenConfirmDeleteModal('especialidad', especialidad.id, especialidad.nombre_especialidad)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-lg font-semibold mt-10 text-[#7A7A7A]">No hay especialidades disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onRequestClose={handleCloseConfirmDeleteModal}
        className="flex justify-center items-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
          <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que quieres eliminar {deleteEntityName}?</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
            <button
              onClick={handleCloseConfirmDeleteModal}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <AddCapituloModal isOpen={isEscuelaModalOpen} onClose={handleCloseEscuelaModal} onSchoolAdded={cargarDatos} />
      <AddEspecialidadModal isOpen={isEspecialidadModalOpen} onClose={handleCloseEspecialidadModal} onSpecialtyAdded={cargarDatos} />

      {selectedEscuela && (
        <EditCapituloModal
          isOpen={isEscuelaEditModalOpen}
          onClose={handleCloseEscuelaEditModal}
          onSchoolUpdated={cargarDatos}
          escuela={selectedEscuela}
        />
      )}

      {selectedEspecialidad && (
        <EditEspecialidadModal
          isOpen={isEspecialidadEditModalOpen}
          onClose={handleCloseEspecialidadEditModal}
          onSpecialtyUpdated={cargarDatos}
          especialidad={selectedEspecialidad}
        />
      )}
    </>
  );
}

export default CapitulosEspecialidadesMain;
