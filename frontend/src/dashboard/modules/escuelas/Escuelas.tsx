import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PersonAdd } from "@mui/icons-material";
import Modal from 'react-modal';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { getAllEscuelas, getAllEspecialidades, deleteEscuela, deleteEspecialidad } from "../../../api/escuela.api";
import { Escuela } from "../../../interfaces/model/Escuela";
import { Especialidad } from "../../../interfaces/model/Especialidad";
import { AgregarEscuela } from "./AgregarEscuela";
import { AgregarEspecialidad } from "./AgregarEspecialidad";
import { ActualizarEscuela } from "./ActualizarEscuela";
import { ActualizarEspecialidad } from "./ActualizarEspecialidad";
import contabilidad from '../../../assets/dashboard/contabilidad.png';

export default function Escuelas() {
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
    try {
      const escuelasRes = await getAllEscuelas();
      setEscuelasList(escuelasRes.data as Escuela[]);
      const especialidadesRes = await getAllEspecialidades();
      setEspecialidadesList(especialidadesRes.data as Especialidad[]);
    } catch (error) {
    }
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
      try {
        if (entityToDelete.type === 'escuela') {
          await deleteEscuela(entityToDelete.id);
        } else if (entityToDelete.type === 'especialidad') {
          await deleteEspecialidad(entityToDelete.id);
        }
        cargarDatos();
        handleCloseConfirmDeleteModal();
      } catch (error) {
        // Manejo de errores
      }
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
    <div className="flex flex-row w-full bg-white">
      <Sidebar />
      <div className="w-full xl:w-4/5 mx-3 p-3">
        <SessionHeader />
        <div className="mt-10 space-y-5">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold">Capítulos</h4>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar Capitulo"
                variant="outlined"
                value={searchTermEscuela}
                onChange={handleSearchChangeEscuela}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#007336',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00330A' },
                }}
                startIcon={<PersonAdd />}
                onClick={handleAddSchool}
              >
                <span className="font-nunito-sans font-extrabold">Agregar Captulo</span>
              </Button>
            </Grid>
          </Grid>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEscuelas.length > 0 ? (
              filteredEscuelas.map((escuela, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 hover:bg-[#458050] hover:text-white group"
                  style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-[#458050] bg-opacity-75">
                    <button className="text-xl text-white mx-2" onClick={() => handleEditSchool(escuela)}>
                      <FaEdit />
                    </button>
                    <button className="text-xl text-white mx-2" onClick={() => handleOpenConfirmDeleteModal('escuela', escuela.id, escuela.nombre_escuela)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                  <img src={contabilidad} alt="Contabilidad" className="mx-auto mb-4 w-20 h-20" />
                  <h5 className="text-xl font-bold font-nunito-sans text-[#00330A]">{escuela.nombre_escuela}</h5>
                </div>
              ))
            ) : (
              <p>No hay escuelas disponibles.</p>
            )}
          </div>

          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold">Especialidades</h4>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar Especialidad"
                variant="outlined"
                value={searchTermEspecialidad}
                onChange={handleSearchChangeEspecialidad}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#007336',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00330A' },
                }}
                startIcon={<PersonAdd />}
                onClick={handleAddSpecialty}
              >
                <span className="font-nunito-sans font-extrabold">Agregar Especialidad</span>
              </Button>
            </Grid>
          </Grid>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEspecialidades.length > 0 ? (
              filteredEspecialidades.map((especialidad, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg p-5 flex justify-between items-center"
                  style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                >
                  <div>
                    <h5 className="text-xl font-bold font-nunito-sans text-[#00330A]">
                      {especialidad.nombre_especialidad}
                    </h5>
                    <p className="text-sm font-semibold font-nunito-sans text-[#00330A]">
                      Capitulo: {especialidad.id_escuela.nombre_escuela}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button className="text-xl text-[#00330A] mx-2" onClick={() => handleEditSpecialty(especialidad)}>
                      <FaEdit />
                    </button>
                    <button className="text-xl text-[#00330A] mx-2" onClick={() => handleOpenConfirmDeleteModal('especialidad', especialidad.id, especialidad.nombre_especialidad)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay especialidades disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
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

      <AgregarEscuela isOpen={isEscuelaModalOpen} onClose={handleCloseEscuelaModal} onSchoolAdded={cargarDatos} />
      <AgregarEspecialidad isOpen={isEspecialidadModalOpen} onClose={handleCloseEspecialidadModal} onSpecialtyAdded={cargarDatos} />
      {selectedEscuela && (
        <ActualizarEscuela
          isOpen={isEscuelaEditModalOpen}
          onClose={handleCloseEscuelaEditModal}
          onSchoolUpdated={cargarDatos}
          escuela={selectedEscuela}
        />
      )}
      {selectedEspecialidad && (
        <ActualizarEspecialidad
          isOpen={isEspecialidadEditModalOpen}
          onClose={handleCloseEspecialidadEditModal}
          onSpecialtyUpdated={cargarDatos}
          especialidad={selectedEspecialidad}
        />
      )}
    </div>
  );
}
