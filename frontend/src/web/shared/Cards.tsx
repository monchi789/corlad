import React from 'react';
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
        <div>
          <h4 className="text-xl text-[#363636] font-nunito font-extrabold mb-3">{cardTitle}</h4>
          <p className="text-[#363636]" dangerouslySetInnerHTML={{ __html: cardText }} />
        </div>
        <div className="mt-auto pt-6 pb-3 text-center">
          <Link to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`} className="text-center align-middle w-full mx-auto px-5 py-1 text-white rounded-lg bg-[#A67102]">
            Leer más &#8594;
          </Link>
        </div>
      </div>
    </div>
  )
}

export const HorizontalCard: React.FC<horizontalCardProps> = ({ imageSource, imageAlt, cardTitle, cardText, noticiaId }) => {
  const formattedTitle = formatTitle(cardTitle);
  return (
    <div className="flex flex-col lg:flex-row rounded-3xl mt-10 lg:mt-0">
      <img className="lg:w-1/3 max-h-[300px] object-cover" src={imageSource} alt={imageAlt} />
      <div className="flex flex-col lg:mx-12 space-y-3">
        <h3 className="text-[#09853C] font-nunito font-extrabold text-2xl mt-5 lg:mt-0">{cardTitle}</h3>
        <p className="text-[#363636]" dangerouslySetInnerHTML={{ __html: cardText }}/>
        <Link to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`}>
          <p className="text-[#00330A] font-semibold">Leer más » </p>
        </Link>
      </div>
    </div>
  )
}
