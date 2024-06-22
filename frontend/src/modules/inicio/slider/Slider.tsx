import './Slider.css'
import logo_corlad_blanco from '../../../assets/corlad_logo.png'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import dataGallery from './dataGallery.tsx'

export default function Slider() {
    return (
        <div>
            <div className='container slider-container flex flex-row my-auto justify-center'>
                <img className='w-1/4' src={logo_corlad_blanco} alt="Logotipo corlad" />
                <div className='ml-4 flex flex-col justify-center'>
                    <h1 className="text-white text-5xl font-extrabold mb-2">COLEGIO DE LICENCIADOS EN ADMINISTRACION</h1>
                    <h2 className="text-white text-4xl font-extrabold">CORLAD CUSCO</h2>
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