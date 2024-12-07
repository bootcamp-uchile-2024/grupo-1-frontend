import React from 'react';
import './FirstTime.css';

const FirstTime: React.FC = () => {
  return (
    <section className="first-time">
      <div className="first-time-content">
        <h2>¿Es tu primera vez cuidando una planta?</h2>
        <p>Descubre la planta ideal para ti y tu ritmo de vida</p>
        <button>Guías de cuidado</button>
        <button>Plantas para principiantes</button>
      </div>
      <div className="first-time-image">
        <img src="/path/to/first-time.png" alt="Primera vez cuidando una planta" />
      </div>
    </section>
  );
};

export default FirstTime;
