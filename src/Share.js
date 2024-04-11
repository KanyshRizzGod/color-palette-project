import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Share({ paletteId }) {
  console.log(paletteId)
  const shareableLink = `${window.location.origin}/shared-palette?palette=${paletteId}`;

  return (
    <div>
      <h2>Share this link with your friends:</h2>
      <input type="text" value={shareableLink} readOnly style={{padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', boxSizing: 'border-box', marginTop: '10px',
      }}/>
      <Link to="/" style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#478ECC',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '25px',
        marginTop: '10px'
      }}>Go Back</Link>
    </div>
  );
}

export default Share;
