import { useEffect, useState } from 'react'
import banner_corlad from '../../../assets/corlad_banner.jpg'
import { getSlider } from '../../../shared/api/slider.api';
import ImageGallery from 'react-image-gallery';

export const DataGallery = () => {
  const [data, setData] = useState<Slider[]>([]);

  useEffect(() => {
    async function cargarSliders() {
      const res = await getSlider();
      const popup: Slider[] = res.data.map((element: Slider) => ({
        id: element.id,
        imagen_1: element.imagen_1,
        imagen_2: element.imagen_2,
        imagen_3: element.imagen_3,
        imagen_4: element.imagen_4,
        estado_slider: element.estado_slider
      }))
      setData(popup)
    }
    cargarSliders()
  }, [])

  const popUpsActivo = data.filter(item => item.estado_slider)


  let dataSlider = popUpsActivo.flatMap(element => [
    {
      original: element.imagen_1,
    },
    {
      original: element.imagen_2,
    },
    {
      original: element.imagen_3,
    },
    {
      original: element.imagen_4,
    }
  ]);

  if (dataSlider.length == 0) {
    dataSlider = [
      {original: banner_corlad }
    ]
  }

  return (
    <>
      <ImageGallery items={dataSlider}
        showPlayButton={false}
        showNav={false}
        showBullets={true}
        showFullscreenButton={false}
        autoPlay={true}
        slideInterval={5000}
        slideDuration={1000}
        additionalClass="my-custom-gallery"
      />
    </>
  )
}
