import React, { useState, useEffect } from 'react';
import Hero from './Hero/Hero';
import './Splash.css';

export default function Splash() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user is using a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent);

    if (isMobile) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="mobile-popup-overlay">
          <div className="mobile-popup">
            <p>Please use a desktop device for the best experience. Mobile development is in progress.</p>
            <button className="mobile-close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <Hero />
    </>
  );
}
