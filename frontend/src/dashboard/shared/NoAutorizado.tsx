import React from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  return (
    <div>
      <h1>No autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};