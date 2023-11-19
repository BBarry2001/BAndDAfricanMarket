import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import styles from './CompanyBenefitsTags.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * CompanyBenefitsTags Component
 * 
 * This component displays a set of benefit tags, showcasing the unique selling points of the B&D African Market.
 * Each tag is a card that highlights a specific benefit of shopping with the market.
 * The cards are arranged in a visually appealing manner against a background image.
 *
 */

function CompanyBenefitsTags() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>

      <Row className={styles.benefitTags} gutter={[16, 16]}>

        <Col span={6} className={styles.leftCol}>
          
          {/* First Card */}
          <div className={styles.tooltip}>
            <Link to="http://external-site.com/to-be-implemented-later" className={styles.noStyleLink}>
              <Card className={`${styles.benefitTag} ${styles.motifBorder}`} 
                title={<span className={styles.cardTitle}>Straight From Africa</span>}>
                At B&D African Market, what you see is what you get—real, organic food sourced directly from Sierra Leone and other parts of West Africa. Feel the vibe of Africa with every bite.
                <div className={styles.learnMore}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </Card>
            </Link>
            <span className={styles.tooltipText}>100% Authentic African produce</span>
          </div>
          
          {/* Second Card */}
          <div className={styles.tooltip}>
            <Link to="http://external-site.com/to-be-implemented-later" className={styles.noStyleLink}>
              <Card className={`${styles.benefitTag} ${styles.motifBorder}`} 
                title={<span className={styles.cardTitle}>We're All About Family</span>}>
                Run by a family, for families. We understand the importance of quality and tradition, and that's what we promise to deliver.
                <div className={styles.learnMore}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </Card>
            </Link>
            <span className={styles.tooltipText}>A family-owned business you can trust</span>
          </div>

        </Col>

        <Col span={7} offset={11} className={styles.rightCol}>

          {/* Third Card */}
          <div className={styles.tooltip}>
            <Link to="http://external-site.com/to-be-implemented-later" className={styles.noStyleLink}>
              <Card className={`${styles.benefitTag} ${styles.motifBorder}`} 
                title={<span className={styles.cardTitle}>Transparent Feedback</span>}>
                We don't just value your opinion, we amplify it. Our transparent review system lets you openly rate our products and communicate with us for a better shopping experience.
                <div className={styles.learnMore}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </Card>
            </Link>
            <span className={styles.tooltipText}>Transparent and valued customer feedback</span>
          </div>

          {/* Fourth Card */}
          <div className={styles.tooltip}>
            <Link to="http://external-site.com/to-be-implemented-later" className={styles.noStyleLink}>
              <Card className={`${styles.benefitTag} ${styles.motifBorder}`} 
                title={<span className={styles.cardTitle}>Our Promise of Quality</span>}>
                We may be new, but our commitment is timeless. While we work on faster delivery and more offerings, we promise quality will always be our top priority.
                <div className={styles.learnMore}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </Card>
            </Link>
            <span className={styles.tooltipText}>Committed to delivering quality, always</span>
          </div>

        </Col>

      </Row>
    </div>
  );
  
}

export default CompanyBenefitsTags;
