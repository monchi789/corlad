import Grid from "@mui/material/Grid";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import Button from "@mui/material/Button";
import { PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function Escuelas() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="mt-10">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-4xl text-[#5F4102] font-nunito font-extrabold">Escuelas</h4>
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
                  <span className="font-nunito font-extrabold" >
                    Agregar Escuela
                  </span>
                </Link>
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-4xl text-[#5F4102] font-nunito font-extrabold">Especialidades</h4>
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
                  <span className="font-nunito font-extrabold" >
                    Agregar Especialidad
                  </span>
                </Link>
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
