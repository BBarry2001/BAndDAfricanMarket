import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Navbar from '../components/header/Navbar';
import styles from './AboutUs.module.css';
import bigImage from '../images/MomImage.png';

/**
 * The `AboutUs` component presents the story behind B&D African Market, combining personal narratives,
 * images, and customer quotes to create a more personal connection with the audience. This component 
 * plays a critical role in establishing the brand's identity and values, and in engaging users through 
 * storytelling.
 * 
 * Features:
 * 1. Personal Narrative: Shares the journey of the business owners, highlighting their roots, passion 
 *    for commerce, and the transition to the United States.
 * 2. Dynamic Customer Quote: Displays a weekly rotating customer quote, adding a personal touch and 
 *    customer perspective.
 * 3. Responsive Design: Adapts to different screen sizes for optimal viewing on various devices.
 * 
 * Notes:
 * - The component is crucial for sharing the brand story and connecting with customers.
 * - Regular content updates are recommended to keep the narrative fresh and engaging.
 * - Consider adding interactive elements for a more dynamic user experience.
 */

const AboutUs = () => {
  const [quote, setQuote] = useState("");

  const getWeeklyQuote = () => {
    const quotes = [
      "Your market brings the flavors of Africa right to our doorstep!",
      "Shopping here feels like taking a culinary trip to Africa.",
      "I find items here that I can't find anywhere else.",
    ];
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weeksSinceStartOfYear = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  
    return quotes[weeksSinceStartOfYear % quotes.length];
  };

  useEffect(() => {
    const weeklyQuote = getWeeklyQuote();
    setQuote(weeklyQuote);
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imageFrame}>
          <img src={bigImage} alt="Big background image" className={styles.mainImage}/>
          <h1 className={styles.title}>Our Family, Our Market</h1>
        </div>
        <div className={styles.textSection}>

        <p className={styles.text}>
          Hello and welcome to B&D African Market! If you've come this far, 
          you're not just a shopper; you're part of our growing community. 
          Now, I think it's only fair that you get to know who's behind this
          website and business. I think it's not just about running a business; 
          it's about making real connections with people. You're not just 
          buying from a faceless store; you're buying from someone who was 
          part of a long journey that's filled with love, heritage, and a lot 
          of hard work. So let's get to know each other better, shall we?"
        </p>

        <p className={styles.text}>   
          I grew up in a simple, but hardworking family. My father served as a dedicated driver while my 
          mother was an industrious vendor in our local market. They worked 
          tirelessly to provide for us, setting an example that kindled my own
          interest in business. Initially, my involvement was aimed at 
          lightening their financial burden. However, I soon found that 
          business, selling stuff, had a different kind of allure for me, beyond just making 
          ends meet.
          </p>

          <p className={styles.text}>
          By the age of 10, I had started selling handcrafted beverages and 
          minor items to contribute to my educational expenses. This endeavor 
          wasn't temporary; it continued throughout my high school years and 
          even into my matrimonial life. Post-marriage, I formalized my 
          education by acquiring a degree in accounting. I secured a position 
          in an international French bank, "BICIGUI," in Conakry, Guinea. Yet the flame for 
          commerce never dimmed. Even during my trips to Europe and the USA when i was younger, I 
          would bring local African products to sell there. Business wasn't just an 
          occupation; it was my lifelong passion.
          </p>

          <p className={styles.text}>Years later, destiny guided me to the 
          United States. Here, I shifted my focus to nursing, dedicating myself 
          to academics and mastering the English language. But the yearning 
          for my entrepreneurial journey was never sidelined. It was only a 
          matter of time before I found an opportunity to return to what I 
          loved the most. Through a partnership with a family friend who runs 
          a similar venture in Sierra Leone, 'B&D African Market' came into 
          existence.

          You see all the food you see on here? It's the same stuff we all 
          grew up eating back home. Whether it's the spices that flavored our 
          favorite stews or the grains that made up our daily meals, each item
          is a little piece of home. And now we're here in the U.S., bringing 
          those flavors right to your doorstep. We're all about keeping that 
          connection to our roots alive. Lastly, i just want to say that your 
          support makes all of this possible, so thank you for being an 
          important part of our journey and community. Much love! ❤️</p>
        </div>

        <Row className={styles.marginQuote}>
          <Col span={24}>
             <h2 className={styles.quoteTitle}>Your Thoughts, Captured</h2> {/*Your Words, Our Motivation */}
            <small className={styles.subText}>Updated Weekly <span className={styles.smileIcon}>😊</span></small>
            <div className={styles.quoteWrapper}>
              <p className={styles.quote}>
                `{quote}`
                <span className={styles.quoteAuthor}> — Aisha, Longtime Customer</span>
              </p>
            </div>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default AboutUs;
