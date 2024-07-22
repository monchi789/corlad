import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { getAllEscuelas, getAllEspecialidades } from "../../../api/escuela.api";
import { Escuela} from "../../../interfaces/model/Escuela";
import { Especialidad } from "../../../interfaces/model/Especialidad";

export function Escuelas() {
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);
  const [especialidadesList, setEspecialidadesList] = useState<Especialidad[]>([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const escuelasRes = await getAllEscuelas();
        setEscuelasList(escuelasRes.data as Escuela[]);

        const especialidadesRes = await getAllEspecialidades();
        setEspecialidadesList(especialidadesRes.data as Especialidad[]);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }
    cargarDatos();
  }, []);

  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="mt-10 space-y-5">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-4xl text-[#5F4102] font-nunito-sans font-bold">Capitulos</h4>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#00330A',
                  color: 'white',
                  '&:hover': { backgroundColor: '#5F4102' },
                }}
                startIcon={<PersonAdd />}
              >
                <Link to={"/admin/colegiado/agregar-colegiado"}>
                  <span className="font-nunito-sans font-extrabold">Agregar Capitulo</span>
                </Link>
              </Button>
            </Grid>
          </Grid>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {escuelasList.length > 0 ? (
              escuelasList.map((escuela, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 hover:bg-[#458050] hover:text-white group"
                  style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-[#458050] bg-opacity-75">
                    <button className="text-xl text-white mx-2">
                      <FaEdit />
                    </button>
                    <button className="text-xl text-white mx-2">
                      <FaTrashAlt />
                    </button>
                  </div>
                  <h5 className="text-xl font-bold font-nunito-sans text-[#00330A]">{escuela.nombre_escuela}</h5>
                </div>
              ))
            ) : (
              <p>No hay escuelas disponibles.</p>
            )}
          </div>

          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-4xl text-[#5F4102] font-nunito-sans font-bold">Especialidades</h4>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#00330A',
                  color: 'white',
                  '&:hover': { backgroundColor: '#5F4102' },
                }}
                startIcon={<PersonAdd />}
              >
                <Link to={"/admin/colegiado/agregar-especialidad"}>
                  <span className="font-nunito-sans font-extrabold">Agregar Especialidad</span>
                </Link>
              </Button>
            </Grid>
          </Grid>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {especialidadesList.length > 0 ? (
              especialidadesList.map((especialidad, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 hover:bg-[#458050] hover:text-white group"
                  style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-[#458050] bg-opacity-75">
                    <button className="text-xl text-white mx-2">
                      <FaEdit />
                    </button>
                    <button className="text-xl text-white mx-2">
                      <FaTrashAlt />
                    </button>
                  </div>
                  <h5 className="text-xl font-bold font-nunito-sans text-[#00330A]">
                    {especialidad.nombre_especialidad}
                  </h5>
                  <p className="text-sm font-semibold font-nunito-sans text-[#00330A]">
                    Capitulo: {especialidad.id_escuela.nombre_escuela}
                  </p>
                </div>
              ))
            ) : (
              <p>No hay especialidades disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
