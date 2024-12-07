import React from 'react';
import './Difficulty.css';

const Difficulty: React.FC = () => {
  return (
    <section className="difficulty">
      <h2>Dificultad</h2>
      <div className="difficulty-levels">
        {[1, 2, 3].map((level) => (
          <button key={level} className={`difficulty-button level-${level}`}>
            {level}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Difficulty;
