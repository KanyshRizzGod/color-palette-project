// SimplePalette.js

import React from 'react';
import styled from 'styled-components';

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid;
  background-color: ${(props) => props.color};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SimplePalette = ({ colors, onSelectColor, selectedColor}) => {
  return (
    <PaletteContainer>
      {colors.map((color, index) => (
        <ColorBox
          key={index}
          color={color}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </PaletteContainer>
  );
};

export default SimplePalette;
