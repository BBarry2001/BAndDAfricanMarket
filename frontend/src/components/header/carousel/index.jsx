import React from 'react';
import { Carousel } from 'antd';
import HeaderSlide1 from './HeaderSlide1'; 
import HeaderSlide2 from './HeaderSlide2'; 
import Carouselstyles from './index.module.css'; 

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className={Carouselstyles.carouselContainer}>
      <Carousel {...settings}>
        <HeaderSlide1 />
        <HeaderSlide2 />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
