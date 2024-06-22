import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    imageSource: string;
    imageAlt: string;
    cardTitle: string;
    cardText: string;
    cardUrl: string;
}

const Card: React.FC<CardProps> = ({ imageSource, imageAlt, cardTitle, cardText, cardUrl }) => {

    return (
        <div className="bg-[#F0F0F0] rounded-3xl shadow-xl max-w-[300px] flex flex-col">
            <img className="w-full h-48 object-cover rounded-t-3xl" src={imageSource} alt={imageAlt} />
            <div className="flex flex-col justify-between flex-1 px-6 py-4">
                <div>
                    <h4 className="font-extrabold text-xl mb-3">{cardTitle}</h4>
                    <p className="mb-3">{cardText}</p>
                </div>
                <div className="mt-auto pt-6 text-center">
                    <Link to="/noticias" className="text-center align-middle w-full mx-auto px-5 py-1 text-white rounded-lg bg-[#A67102]">
                        Leer más &#8594;
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card