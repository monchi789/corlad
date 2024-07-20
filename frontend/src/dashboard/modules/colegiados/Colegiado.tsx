  import {
  Container, Grid, Button, Select, Typography, TextField, MenuItem,
} from '@mui/material';
import { PersonAdd} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Colegiado2 = () => {
  return (
    <Container className="mt-10" maxWidth="xl">
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
        <h4 className="text-4xl text-[#5F4102] font-nunito font-extrabold">Panel de administración - Colegiados</h4>
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
            <Typography variant="button" display="block" sx={{ fontFamily: 'Arial Black' }}>
              Añadir Colegiado
            </Typography>
            </Link>
          </Button>
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ mt: 2, mb: 2, backgroundColor: '#C9D9C6', padding: 2, border: '1px solid #ccc', borderRadius: 10 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Arial Black', color: '#5F4102' }}>
              DNI
            </Typography>
            
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#5F4102',
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&:hover fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5F4102',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Arial Black', color: '#5F4102' }}>
              N° Colegiatura
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#5F4102',
                  borderRadius: 5,
                  '& fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&:hover fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5F4102',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Arial Black', color: '#5F4102' }}>
              Apellidos
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#5F4102',
                  borderRadius: 5,
                  '& fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&:hover fieldset': {
                    borderColor: '#5F4102',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5F4102',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Arial Black', color: '#5F4102' }}>
              Estado
            </Typography>
            <Select
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: '#5F4102',
                borderRadius: 5,
                '& fieldset': {
                  borderColor: '#5F4102',
                },
                '&:hover fieldset': {
                  borderColor: '#5F4102',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5F4102',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
                '& .MuiSelect-select': {
                  '&:focus': {
                    backgroundColor: 'transparent',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
                '& .MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontFamily: 'Arial Black',
                },
              }}
            >
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#00330A',
                color: 'white',
                '&:hover': { backgroundColor: '#5F4102' },
              }}
            >
              <SearchIcon />
              <Typography variant="button" display="block" sx={{ fontFamily: 'Arial Black', marginLeft: 1 }}>
                Buscar
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Colegiado2;
