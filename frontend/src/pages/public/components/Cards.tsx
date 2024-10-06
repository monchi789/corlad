import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  imageSource: string | null;
  imageAlt: string;
  cardTitle: string;
  cardText: string;
  date: string;
  category: string;
  noticiaId: number;
}

interface horizontalCardProps {
  imageSource: string | null;
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

function limitarContenido(texto: string, limitePalabras: number): string {
  const palabras = texto.split(' ');
  if (palabras.length > limitePalabras) {
    return palabras.slice(0, limitePalabras).join(' ') + '...';
  }
  return texto;
}

function formatDate(fechaApi: string): string {
  const date = new Date(fechaApi); // Convierte la fecha de la API en un objeto Date

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short', // "short" muestra "Oct" en lugar de "October"
    day: 'numeric'
  };

  return date.toLocaleDateString('es-ES', options);
}

const Card: React.FC<CardProps> = ({ imageSource, imageAlt, cardTitle, cardText, date, category, noticiaId }) => {
  const formattedTitle = formatTitle(cardTitle);
  return (
    <div className="flex flex-col bg-[#F8F8F8] rounded-lg shadow-md w-[300px] md:w-[400px]">
      {
        imageSource != null ?
          <img className="w-full h-48 object-cover rounded-t-lg" src={imageSource} alt={imageAlt} />
          : <div></div>
      }
      <div className="flex flex-col justify-between flex-1 px-5 py-4">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-500">{formatDate(date)}</span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{category}</span>
        </div>
        <h4 className="text-2xl text-[#00330A] font-nunito font-extrabold mb-3">{cardTitle}</h4>
        <p className="text-[#363636] mb-auto" dangerouslySetInnerHTML={{ __html: limitarContenido(cardText, 15) }} />
        <Link
          to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`}
          className="inline-block bg-corlad text-white font-semibold rounded hover:bg-hover-corlad transition-colors duration-300 mt-5 me-auto px-4 py-2"
        >
          Leer más
        </Link>
      </div>
    </div>
  )
}

const HorizontalCard: React.FC<horizontalCardProps> = ({ imageSource, imageAlt, cardTitle, cardText, cardDate, noticiaId }) => {
  const formattedTitle = formatTitle(cardTitle);
  return (
    <div className="flex flex-col lg:flex-row font-nunito bg-[#F8F8F8] rounded-xl lg:mt-0 px-5 py-5">
      {
        imageSource != null ?
          <img
            className="lg:w-1/3 max-h-[500px] object-cover"
            src={imageSource}
            alt={imageAlt}
          />
          : <div></div>
      }
      <div className="flex flex-col lg:mx-5 space-y-3 flex-1">
        <h4 className="text-[#09853C] font-extrabold text-2xl mt-5 lg:mt-0">{cardTitle}</h4>
        <p className="text-[#363636] flex-grow" dangerouslySetInnerHTML={{ __html: cardText }} />
        <div className="flex flex-row justify-between mt-auto">
          <span className="text-gray-500 font-semibold ">{formatDate(cardDate)}</span>
          <Link to={`/noticias/${noticiaId}/${formatTitle(formattedTitle)}`}>
            <p className="text-[#00330A] hover:text-[#09853C] font-semibold">Leer más » </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card
export { Card, HorizontalCard }
