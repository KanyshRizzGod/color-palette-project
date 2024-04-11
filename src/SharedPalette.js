import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SharedPalette({ paletteId }) {
  console.log(paletteId)
  const [paletteData, setPaletteData] = useState(null);

  useEffect(() => {
    if (paletteId) {
      const storedPalette = paletteId.split('_');
      console.log(storedPalette);
      storedPalette.forEach(function(elem, index) {
        this[index] = "#" + elem;
      }, storedPalette);
      console.log(storedPalette)
      if (storedPalette.length > 0) {
        const data = {
          name: 'Selected Palette',
          colors: storedPalette,
        };
        setPaletteData(data);
      }
    }
  }, [paletteId]);

  if (!paletteData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{paddingBottom: '40px'}}>
      <h1>{paletteData.name}</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {paletteData.colors.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, width: 50, height: 50 }}></div>
        ))}
      </div>
    </div>
  );
}

export default SharedPalette;
