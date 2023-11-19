import React from 'react';
import Navbar from './Navbar.jsx'; 
import CarouselComponent from './carousel/index'; 
import '../../responsive/HeaderResponsive.css';

function Header() {
  return (
    <>
      <Navbar />
      <CarouselComponent />
    </>
  );
}

export default Header;
