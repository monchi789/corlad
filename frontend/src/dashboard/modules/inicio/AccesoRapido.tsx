import { Container, Grid, Button, Typography } from '@mui/material';
import { PersonAdd, School, Payment, Publish, OpenInBrowser, Slideshow, MedicalServices, AccountBalance } from '@mui/icons-material';
import 'react-image-gallery/styles/css/image-gallery.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AccesoRapido = () => {
  const buttons = [
    { label: 'Nuevo usuario', icon: <PersonAdd sx={{ color: '#5F4102' }} />, link: '/new-user' },
    { label: 'Nuevo colegiado', icon: <School sx={{ color: '#5F4102' }} />, link: '/admin/colegiado' },
    { label: 'Nueva escuela', icon: <AccountBalance sx={{ color: '#5F4102' }} />, link: '/new-school' },
    { label: 'Nueva publicación', icon: <Publish sx={{ color: '#5F4102' }} />, link: '/new-publication' },
    { label: 'Nuevo pago', icon: <Payment sx={{ color: '#5F4102' }} />, link: '/new-payment' },
    { label: 'Nuevo popUp', icon: <OpenInBrowser sx={{ color: '#5F4102' }} />, link: '/new-popup' },
    { label: 'Nuevo Slider', icon: <Slideshow sx={{ color: '#5F4102' }} />, link: '/new-slider' },
    { label: 'Nueva especialidad', icon: <MedicalServices sx={{ color: '#5F4102' }} />, link: '/new-specialty' },
  ];

  return (
    <Container className='mt-10' maxWidth="xl">
      <h4 className="text-2xl my-5">Acceso Rápido</h4>
      <Grid container spacing={4} justifyContent="start"> {/* reduce el espacio entre los botones */}
        {buttons.map((button, index) => (
          <Grid item key={index} xs={12} sm={4} md={4} lg={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#00330A',
                padding: '30px 12px', /* reduce el padding para que los botones sean menos altos */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 300, /* reduce el ancho del botón */
                height: 40, /* reduce la altura del botón */
                textTransform: 'none', /* quita el estilo de mayúsculas */
                boxShadow: '0px 2px 4px rgba(51, 164, 2, 0.2)', /* sombra verde */
                border: '1px solid #ccc',
                fontWeight: 700, /* aumenta el grosor de las letras */
                fontSize: 14, /* aumenta el tamaño de la letra */
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#00330A',
                },
              }}
            >
              {button.icon}
              <Typography variant="button" sx={{ ml: 1, color: '#00330A', fontWeight: 700, fontSize: 14, textTransform: 'none' }}>
                {button.label}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AccesoRapido;
