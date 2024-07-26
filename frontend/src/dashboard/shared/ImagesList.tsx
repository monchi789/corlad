import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import { getPopUps } from '../../api/popup.api';
import { PopUp } from '../../interfaces/model/PopUp';
import { Slider } from '../../interfaces/model/Slider';
import { getSlider } from '../../api/slider.api';

interface ImagesListProps {
  tipo: string;
}

// Define una interfaz que combine las propiedades comunes de PopUp y Slider
interface ImageProps {
  id: number
  imagen: string;
  estado_popup?: boolean; 
  estado_slider?: boolean;
}

const Image: React.FC<ImageProps> = ({ imagen, estado_popup, estado_slider }) => {
  // Usa un estado condicionalmente basado en la prop que esté disponible
  const [checked, setChecked] = useState(estado_popup ?? estado_slider ?? false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className="w-1/6 relative border-solid border-2 border-[#2A8B3D] rounded-xl">
      <img className="w-full h-48 object-cover rounded-lg" src={imagen} alt="imagen" />
      <div className='absolute top-0 right-0 m-3'>
        <Switch onChange={handleChange} checked={checked} />
      </div>
    </div>
  );
};

export const ImagesList: React.FC<ImagesListProps> = ({ tipo }) => {
  const [list, setList] = useState<(PopUp | Slider)[]>([]);

  useEffect(() => {
    if (tipo === "popup") {
      getPopUps().then(res => {
        setList(res.data);
      });
    } else if (tipo === "slider") {
      getSlider().then(res => {
        setList(res.data);
        console.log(res);
      });
    }
  }, [tipo]);

  return (
    <div className="flex flex-col mt-10 space-y-5">
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-extrabold">
        {tipo === "popup" ? "Pop Ups" : "Sliders"}
      </h4>
      <div className="flex flex-row space-x-3">
        {list.map((element, index) => (
          <Image
            key={index}
            id={element.id}
            imagen={
              tipo === "popup"
                ? `${import.meta.env.VITE_API_URL_ALTER}${(element as PopUp).imagen}`
                : `${import.meta.env.VITE_API_URL_ALTER}${(element as Slider).imagen_1}`
            }
            estado_popup={tipo === "popup" ? (element as PopUp).estado_popup : undefined}
            estado_slider={tipo === "slider" ? (element as Slider).estado_slider : undefined}
          />
        ))}
      </div>
    </div>
  );
};
