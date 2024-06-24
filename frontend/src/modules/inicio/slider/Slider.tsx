import './Slider.css'
import logo_corlad_blanco from '../../../assets/corlad_logo.png'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import { dataGallery } from './dataGallery.tsx'

export default function Slider() {
  return (
    <div className='relative'>
      <div className='container flex flex-col lg:flex-row mx-auto slider-container justify-center absolute'>
        <img className='w-1/2 md:w-1/4 md:ms-24' src={logo_corlad_blanco} alt="Logotipo corlad" />
        <div className='w-2/4 me-24 flex flex-col justify-center'>
          <h1 className="text-white text-2xl leading-loose md:text-5xl font-bold mb-2 font-mukta md:leading-loose">COLEGIO DE LICENCIADOS EN ADMINISTRACION <br /> <span className='text-lg md:text-4xl'>CORLAD CUSCO</span></h1>
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
