import React, { useState } from 'react';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
        <Button className="slider-button" variant="contained" size="small" onClick={toggleContent}>
            Admin
        </Button>
    </div>
  );
}

export default ContentSlider;