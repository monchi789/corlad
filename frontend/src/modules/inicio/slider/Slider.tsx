import './Slider.css'
import logo_corlad_blanco from '../../../assets/corlad_logo.png'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import { dataGallery } from './dataGallery.tsx'

export default function Slider() {
  return (
    <div className='relative'>
      <div className='container flex flex-col md:flex-row mx-auto slider-container justify-center items-center absolute'>
        <img className='w-4/6 md:w-2/4 xl:w-2/6' src={logo_corlad_blanco} alt="Logotipo corlad" />
        <div className='w-2/4 mt-5 md:my-auto md:me-24 flex flex-col justify-center items-center'>
          <h1 className="text-white text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold font-mukta leading-loose md:leading-loose lg:leading-loose xl:leading-loose">COLEGIO DE LICENCIADOS EN ADMINISTRACION <br /> <span className='text-2xl lg:text-4xl'>CORLAD CUSCO</span></h1>
        </div>
      </div>
      <ImageGallery items={dataGallery}
        showPlayButton={false}
        showNav={false}
        showBullets={true}
        showFullscreenButton={false}
        autoPlay={true}
        slideInterval={5000}
        slideDuration={1000}
        additionalClass="my-custom-gallery"
      />
    </div>
  )
}
