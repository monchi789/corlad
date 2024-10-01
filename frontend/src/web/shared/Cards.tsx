import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface CardProps {
  imageSource: string;
  imageAlt: string;
  cardTitle: string;
  cardText: string;
  noticiaId: number;
}

interface horizontalCardProps {
  imageSource: string;
  imageAlt: string;
  cardTitle: string;
  cardText: string;
  cardDate: string;
  noticiaId: number;
}

const formatTitle = (title: string) => {
  return title
    .replace(/\s+/g, '_') // Reemplaza espacios con guiones bajos
    .replace(/[^\w-]/g, ''); // Elimina caracteres especiales
};

export const Card: React.FC<CardProps> = ({ imageSource, imageAlt, cardTitle, cardText, noticiaId }) => {
  const formattedTitle = formatTitle(cardTitle);
  return (
    <div className="flex flex-col bg-[#F0F0F0] rounded-3xl shadow-xl min-w-[300px]  max-w-[300px]">
      <img className="w-full h-48 object-cover rounded-t-3xl" src={imageSource} alt={imageAlt} />
      <div className="flex flex-col justify-between flex-1 px-5 py-4">
        <h4 className="text-xl text-[#00330A] font-nunito font-extrabold mb-3">{cardTitle}</h4>
        <p className="text-[#363636] mt-auto" dangerouslySetInnerHTML={{ __html: cardText }} />
        <Link to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`}>
          <button className="flex items-center justify-center bg-[#a67102] hover:bg-[#8C5D01] text-white rounded-lg mx-auto font-nunito transition duration-300 space-x-2 mt-5 py-1 px-4">
            <span>Leer más</span>
            <FaArrowRightLong />
          </button>
        </Link>
      </div>
    </div>
  )
}

export const HorizontalCard: React.FC<horizontalCardProps> = ({ imageSource, imageAlt, cardTitle, cardText, cardDate, noticiaId }) => {
  const formattedTitle = formatTitle(cardTitle);
  return (
    <div className="flex flex-col lg:flex-row font-nunito rounded-3xl mt-10 lg:mt-0">
      <img className="lg:w-1/3 max-h-[300px] object-cover" src={imageSource} alt={imageAlt} />
      <div className="flex flex-col lg:mx-5 space-y-3 flex-1">
        <h4 className="text-[#09853C] font-extrabold text-2xl mt-5 lg:mt-0">{cardTitle}</h4>
        <p className="text-[#363636] flex-grow" dangerouslySetInnerHTML={{ __html: cardText }} />
        <div className="flex flex-row justify-between mt-auto">
          <span className="text-gray-500 font-semibold ">{cardDate}</span>
          <Link to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`}>
            <p className="text-[#00330A] hover:text-[#09853C] font-semibold">Leer más » </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

