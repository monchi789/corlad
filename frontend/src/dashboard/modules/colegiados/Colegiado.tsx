import {
  Grid, Button, Typography
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Colegiado = () => {
  return (
    <div className="mt-10 pb-5">
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold">Panel de administración - Colegiados</h4>
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
              <Typography className='py-1' variant="button" display="block" sx={{ fontFamily: 'Arial Black' }}>
                Añadir Colegiado
              </Typography>
            </Link>
          </Button>
        </Grid>
      </Grid>

      <div className="mt-5 bg-[#C9D9C6] rounded-2xl">
        <div className="flex flex-row space-x-5 p-5">
          <div className="w-2/6 flex flex-col">
            <label htmlFor="nombre" className="block font-nunito font-bold mb-1">DNI</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl focus:outline-none p-2 px-2"
              required
            />
          </div>
          <div className="w-2/6 flex flex-col">
            <label htmlFor="nombre" className="block font-nunito font-bold mb-1">N° Colegiatura</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl focus:outline-none p-2 px-2"
              required
            />
          </div>
          <div className="w-2/6 flex flex-col">
            <label htmlFor="nombre" className="block font-nunito font-bold mb-1">Apellidos</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl focus:outline-none p-2 px-2"
              required
            />
          </div>
          <div className="w-1/6 flex flex-col">
            <label htmlFor="nombre" className="block font-nunito font-bold mb-1">Estado</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl focus:outline-none p-2 px-2"
              required
            />
          </div>
          <button className="w-1/6  font-nunito font-black bg-[#007336] text-[#F9ECD9] rounded-xl mt-auto py-2"><SearchIcon/> Buscar</button>
        </div>
      </div>
    </div>
  );
};

export default Colegiado;
