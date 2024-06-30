import './Slider.css'
import logo_corlad_blanco from '../../../assets/corlad_logo_blanco.png'
import 'react-image-gallery/styles/css/image-gallery.css'
import { DataGallery } from './dataGallery.tsx'

export default function Slider() {
  return (
    <div className='relative mt-28 xl:mt-32'>
      <div className='container flex flex-col md:flex-row mx-auto slider-container justify-center items-center absolute'>
        <img className='w-4/6 md:w-2/4 xl:w-2/6' src={logo_corlad_blanco} alt="Logotipo corlad" />
        <div className='w-2/4 mt-5 md:my-auto md:me-24 flex flex-col justify-center items-center'>
          <h1 className="text-white text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold font-mukta leading-loose md:leading-loose lg:leading-loose xl:leading-loose">
            COLEGIO REGIONAL DE LICENCIADOS EN ADMINISTRACION <br />
            <span className='text-2xl lg:text-4xl'>CORLAD - CUSCO</span>
          </h1>
        </div>
      </div>
      <DataGallery/>
    </div>
  )
}
