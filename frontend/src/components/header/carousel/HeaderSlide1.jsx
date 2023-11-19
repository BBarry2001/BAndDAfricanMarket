import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide1Image from '../../../images/Slide1Image.jpg';
import styles from './HeaderSlide1.module.css';

const WelcomeSlide = () => {
  const [currentGreeting, cycleGreeting] = useState(0);
  const greetings = ["مرحبا ", "Karibu ", "Akwaaba ", "Barka ", "Welcome "];

  useEffect(() => {
    const interval = setInterval(() => {
      cycleGreeting(prev => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <div className={styles.carouselItem}>
      <img src={Slide1Image} alt="Colorful fruits" className={styles.background} />
      <div className={styles.centerContainer}>
        <h3 className={styles.header}>
          <span key={currentGreeting} className={`${styles.greeting} ${currentGreeting < greetings.length - 1 ? 'fadeIn' : 'fadeOut'}`}>
            {greetings[currentGreeting]}
          </span>
          To B&D African Market!
        </h3>
        <p className={styles.paragraph}>
          A colorful journey awaits you, rich with the flavors and traditions of Africa. Feel the essence of community in every bite.
        </p>
        <div className={styles.buttonContainer}>
          <Link to="/products" className={styles.button1}>Browse Our Products!</Link>
          <a href="#our-story" className={styles.button2}>Our Story</a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSlide;
