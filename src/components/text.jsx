import React from 'react';
import './text.css';

function Text({ text }) {
  return (
    <div className="text-container">
      <h2>Texto {text.number}</h2>
      <h2>{text.title}</h2>
      <p>{text.text}</p>
    </div>
  );
}

export default Text;