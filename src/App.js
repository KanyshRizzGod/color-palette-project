import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SimplePalette from './components/SimplePalette';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import Share from '../src/Share'; 
import SharedPalette from '../src/SharedPalette';
import { BrowserRouter as Router } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PalettesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ColorPickerContainer = styled.div`
  margin-top: 20px;
`;

function App() {
  const [paletteId, setPaletteId] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paletteColors = urlParams.get('palette');
    if (paletteColors) {
      const storedPalette = paletteColors.split('_');
      storedPalette.forEach(function(elem, index) {
        this[index] = "#" + elem;
      }, storedPalette);
      setPalettes([{colors: storedPalette }]);
    }
  }, []);

  const generatePaletteId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const generateRandomPalette = () => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    let url = '';
    newPalette.forEach(element => {
      url += '_'
      url += element.substring(1);
    });
    url = url.substring(1);
    const paletteId = generatePaletteId();
    setPalettes([...palettes, { id: paletteId, colors: newPalette }]);
    window.history.pushState({}, '', `?palette=${url}`);
  };

  const handleDeletePalette = (paletteId) => {
    const updatedPalettes = palettes.filter((palette) => palette.id !== paletteId);
    setPalettes(updatedPalettes);
    window.history.pushState({}, '', '/');
  };

  const handleColorSelect = (color, paletteId) => {
    const paletteIndex = palettes.findIndex((palette) => palette.id === paletteId);
    setSelectedPalette(paletteIndex);
    setSelectedColor(color);
    setDisplayColorPicker(true);

    console.log(typeof color)
  };

  const handleColorChange = (color) => {
    const updatedPalette = [...palettes[selectedPalette].colors];
    updatedPalette[palettes[selectedPalette].colors.indexOf(selectedColor)] = color.hex;
    const updatedPalettes = [...palettes];
    updatedPalettes[selectedPalette] = { ...updatedPalettes[selectedPalette], colors: updatedPalette };
    setPalettes(updatedPalettes);
    setSelectedColor(color.hex);
  };

  const handleShare = (colors) => {
    let url = '';
    colors.forEach(element => {
      url += '_'
      url += element.substring(1);
    });
    url = url.substring(1);
    setPaletteId(url); 
    console.log(url)
  };

  return (
    <Router>
    <AppContainer>
      <Header />
      <button onClick={generateRandomPalette} style={{ 
  backgroundColor: '#04AA6D', 
  color: 'white', 
  padding: '15px 32px', 
  textAlign: 'center', 
  textDecoration: 'none', 
  display: 'inline-block', 
  fontSize: '16px',
  borderRadius: '25px',
  border: 'none'
}}>Generate Random Palette</button>
      <PalettesContainer>
        {palettes.map((palette) => (
          <div key={palette.id}>
            <SimplePalette
              colors={palette.colors}
              onSelectColor={(color) => handleColorSelect(color, palette.id)}
              selectedColor = {selectedColor}
            />
            <button onClick={() => handleShare(palette.colors)} style={{ 
  backgroundColor: '#478ECC', 
  color: 'white', 
  padding: '15px 32px', 
  textAlign: 'center', 
  textDecoration: 'none', 
  display: 'inline-block', 
  fontSize: '16px',
  borderRadius: '25px',
  border: 'none'
}}>Share Palette</button>
            <button onClick={() => handleDeletePalette(palette.id)} style={{ 
  backgroundColor: '#F04438', 
  color: 'white', 
  padding: '15px 32px', 
  margin: '20px',
  textAlign: 'center', 
  textDecoration: 'none', 
  display: 'inline-block', 
  fontSize: '16px',
  borderRadius: '25px',
  border: 'none'
}}>Delete Palette</button>
          </div>
        ))}
      </PalettesContainer>
      {selectedColor && (
        <ColorPickerContainer>
          <h2>Selected Color:</h2>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: selectedColor,
              borderRadius: '5px',
              border: 'solid 2px black' 
            }}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          ></div>
          {displayColorPicker && (
            <div style={{ position: 'relative', zIndex: '2', left: '110px', top: '-100px' }}>

              <ChromePicker
                color={selectedColor}
                onChange={handleColorChange}
              />
            </div>
          )}
        </ColorPickerContainer>
      )}
      {!palettes.length && selectedColor && (
        <ColorPickerContainer>
          <h2>Selected Color:</h2>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: selectedColor,
              borderRadius: '5px',
            }}
          ></div>
        </ColorPickerContainer>
      )}
        {paletteId && <Share paletteId={paletteId} />}
        {paletteId && <SharedPalette paletteId={paletteId} />}
    </AppContainer>
    </Router>
  );
}

export default App;
