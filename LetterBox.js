// src/LetterBox.js
import React from 'react';

const LetterBox = ({ letter, isVisible, boxStyle = {}, letterStyle = {} }) => {
  const defaultBoxStyle = {
    border: '1px solid #333',
    width: '40px',
    height: '40px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '40px',
    margin: '5px',
  };

  const defaultLetterStyle = {
    fontSize: '30px',
  };

  return (
    <div style={{ ...defaultBoxStyle, ...boxStyle }}>
      <span style={{ ...defaultLetterStyle, ...letterStyle }}>
        {isVisible ? letter : '_'}
      </span>
    </div>
  );
};

export default LetterBox;
