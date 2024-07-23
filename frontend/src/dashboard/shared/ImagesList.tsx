import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import { getPopUps } from '../../api/popup.api';
import { PopUp } from '../../interfaces/PopUp';


const Image: React.FC<PopUp> = ({ imagen, estado_popup }) => {
  const [checked, setChecked] = useState(estado_popup);


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

export const ImagesList: React.FC = () => {
  const [anuncios, setAnunciosList] = useState<PopUp[]>([]);

  useEffect(() => {
    getPopUps()
      .then(res => {
        setAnunciosList(res.data)
      })
  },[])

  return (
    <div className="flex flex-col mt-10 space-y-5">
      <h4 className="text-2xl text-[#5F4102] font-nunito font-extrabold">Sliders</h4>
      <div className="flex flex-row space-x-3">
        {anuncios.map((element, index) => (
          <Image key={index} id={element.id} imagen={import.meta.env.VITE_API_URL_ALTER+element.imagen} estado_popup={element.estado_popup}/>
        ))
        }
      </div>
    </div>
  );
};
