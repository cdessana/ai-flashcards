import { useState } from 'react';
import './Flashcard.css';

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        <div className="card-front">
          <span className="card-label">Question</span>
          <p className="card-text">{front}</p>
        </div>

        <div className="card-back">
          <span className="card-label">Answer</span>
          <p className="card-text">{back}</p>
        </div>

      </div>
    </div>
  );
}
