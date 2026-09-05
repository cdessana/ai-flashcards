import { useState } from 'react';
import Flashcard from './Flashcard';
import './App.css'; // Vite's default CSS is fine, but you can clear it if it looks weird

interface CardData {
  front: string;
  back: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError('');
    setCards([]);

    const formData = new FormData();
    formData.append('document', file);

    try {
      // Calling your local Express backend
      const response = await fetch('http://localhost:8080/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards. Make sure it is a valid text PDF.');
      }

      const data: CardData[] = await response.json();
      setCards(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2c3e50' }}>AI Flashcard Generator</h1>
        <p style={{ color: '#666' }}>Upload a PDF to automatically generate study cards using Gemini 1.5 Flash</p>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <input 
          type="file" 
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          style={{ padding: '0.5rem' }}
        />
        <button 
          onClick={handleUpload} 
          disabled={!file || loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading || !file ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Analyzing Document...' : 'Generate Flashcards'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '20px' 
      }}>
        {cards.map((card, index) => (
          <Flashcard key={index} front={card.front} back={card.back} />
        ))}
      </div>
    </div>
  );
}

export default App;
