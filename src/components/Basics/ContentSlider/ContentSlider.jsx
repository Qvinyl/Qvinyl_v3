import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Slider.css';

function ContentSlider({ content }) {
  const [showContent, setShowContent] = useState(true);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="content-slider">
        <div className={`slider-content ${showContent ? 'show' : ''}`}>
            {content}
        </div>
        <Button className="slider-button" variant="contained" onClick={toggleContent}>
            Admin
        </Button>
    </div>
  );
}

export default ContentSlider;