import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { Slider } from '../../../interfaces/model/Slider';
import { getSlider } from '../../../api/slider.api';
import { IoExpand, IoCloseSharp, IoArrowBack, IoArrowForward, IoAdd } from "react-icons/io5";

Modal.setAppElement('#root');

interface ImageProps {
  id: number;
  imagenes: string[];
  estado_slider?: boolean;
}

const Image: React.FC<ImageProps> = ({ imagenes, estado_slider }) => {
  const [checked, setChecked] = useState(estado_slider ?? false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <>
      <div className="w-1/6 relative border-solid border-2 border-[#2A8B3D] rounded-xl">
        <img className="w-full h-48 object-cover rounded-lg" src={imagenes[0]} alt="imagen" />
        <div className='absolute top-0 right-0 m-3'>
          <Switch onChange={handleChange} checked={checked} />
        </div>
        <button
          onClick={openModal}
          className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
        >
          <IoExpand />
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Gallery"
        className="fixed inset-0 flex items-center justify-center z-[1000]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
      >
        <div className="relative z-50 bg-white p-5 rounded-lg">
          <img src={imagenes[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="max-h-[80vh] max-w-[80vw]" />
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 text-xl cursor-pointer flex items-center justify-center"
          >
            <IoCloseSharp />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center"
          >
            <IoArrowBack />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center"
          >
            <IoArrowForward />
          </button>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {imagenes.length}
          </div>
        </div>
      </Modal>
    </>
  );
};

export const SlidersList = () => {
  const [list, setList] = useState<Slider[]>([]);

  useEffect(() => {
    getSlider().then(res => {
      setList(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div className="flex flex-col mt-10 space-y-5">
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-extrabold">Sliders</h4>
      <div className="flex flex-row space-x-3">
        {list.map((element, index) => (
          <Image
            key={index}
            id={element.id}
            imagenes={[
              `${import.meta.env.VITE_API_URL_ALTER}${element.imagen_1}`,
              `${import.meta.env.VITE_API_URL_ALTER}${element.imagen_2}`,
              `${import.meta.env.VITE_API_URL_ALTER}${element.imagen_3}`,
              `${import.meta.env.VITE_API_URL_ALTER}${element.imagen_4}`
            ].filter(Boolean)} // Esto eliminará las URLs vacías si alguna imagen no está definida
            estado_slider={element.estado_slider}
          />
        ))}
        <button className="flex w-1/6 bg-[#FCFFDB] items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl">
          <div className="mx-auto my-auto">
            <IoAdd className="mx-auto mb-3" size={45} />
            <span className="text-2xl text-[#5F4102] font-nunito font-extrabold mx-auto">Nuevo slider</span>
          </div>
        </button>
      </div>
    </div>
  );
};