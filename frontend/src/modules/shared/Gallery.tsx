import { useEffect, useState } from 'react'
import banner_corlad from '../../assets/corlad_banner.jpg'
import { getSlider } from '../../shared/api/slider.api';
import ImageGallery from 'react-image-gallery';
import { Slider } from '../../interfaces/Slider';
import { useLocation } from 'react-router-dom';

export function Gallery() {
  const [data, setData] = useState<Slider[]>([]);
  const location = useLocation();
  const currentPath = location.pathname; 

  useEffect(() => {
    async function cargarSliders() {
      const res = await getSlider();
      const slider: Slider[] = res.data.map((element: Slider) => ({
        id: element.id,
        imagen_1: element.imagen_1,
        imagen_2: element.imagen_2,
        imagen_3: element.imagen_3,
        imagen_4: element.imagen_4,
        estado_slider: element.estado_slider
      }))
      setData(slider)
    }
    cargarSliders()

  }, [])

  const SliderActivo = data.filter(item => item.estado_slider)


  let dataSlider = SliderActivo.flatMap(element => [
    {
      original: import.meta.env.VITE_API_URL_ALTER+element.imagen_1
    },
    {
      original: import.meta.env.VITE_API_URL_ALTER+element.imagen_2
    },
    {
      original: import.meta.env.VITE_API_URL_ALTER+element.imagen_3
    },
    {
      original: import.meta.env.VITE_API_URL_ALTER+element.imagen_4
    }
  ]);

  const renderImageInicio = (item: any) => {
    return (
      <img src={item.original} alt="" className="h-[750px] w-full object-cover brightness-[0.40] cursor-default" />
    );
  };

  const renderImageNosotros = (item: any) => {
    return (
      <img src={item.original} alt="" className="h-[750px] w-full object-cover cursor-default" />
    );
  };

  if (dataSlider.length == 0) {
    dataSlider = [
      { original: banner_corlad }
    ]
  }

  const renderItem = currentPath === '/' ? renderImageInicio : renderImageNosotros;

  return (
    <>
      <ImageGallery items={dataSlider}
        renderItem={renderItem}
        showPlayButton={false}
        showNav={false}
        showBullets={true}
        showFullscreenButton={false}
        autoPlay={true}
        slideInterval={5000}
        slideDuration={1000}
        additionalClass="w-full max-w-[2500px] mx-auto"
      />
    </>
  )
}
