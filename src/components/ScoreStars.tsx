import React from 'react';

interface ScoreStarsProps {
  score: number;
}

const ScoreStars: React.FC<ScoreStarsProps> = ({ score }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < score ? 'text-yellow-500' : 'text-gray-300'}>
      ★
    </span>
  ));

  return <div className="flex">{stars}</div>;
};

export { ScoreStars };
