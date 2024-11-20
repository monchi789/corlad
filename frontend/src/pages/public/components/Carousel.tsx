import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import andina from '../../../assets/web/andina.png'
import grupo_consultor from '../../../assets/web/grupo_consultor_innovacion_desarrollo.jpg'
import cecadeh from '../../../assets/web/cecadeh.png'

interface ImageSlide {
  src: string;
  alt: string;
}

const MyCarousel: React.FC = () => {
  const images: ImageSlide[] = [
    { src: andina, alt: "Logo de la Universidad Andina del Cusco" },
    { src: grupo_consultor, alt: "Logo del Grupo Consultor de Innovacion y Desarrollo" },
    { src: cecadeh, alt: "Logo del Centro de Capacitacion y Consultoria para el Desarrollo Humano" },
  ];

  //Configuracion para el carousel
  const settings = {
    dots: true,
    arrows: false,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img src={image.src} alt={image.alt} className="w-full h-48 object-contain" />
          </div>
        ))}

      </Slider>
    </div>
  );
};

export default MyCarousel;
