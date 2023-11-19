import  { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import SpecialCompanyStaticOffersStyle from './SpecialCompanyStaticOffers.module.css';

/**
 * SpecialCompanyStaticOffers Component
 * 
 * This component displays special offers of B&D African Market in a visually appealing manner.
 * It uses font-awesome icons to represent different offers like exclusive deals, contact assistance,
 * no-risk satisfaction, and unbeatable return policy.
 * 
 * State:
 * - tooltipText: Text shown on the tooltip, changes on email copy.
 * 
 * Functionality:
 * - copyEmail: Copies the contact email to clipboard and updates tooltip text.
 */

function SpecialCompanyStaticOffers() {
  const [tooltipText, setTooltipText] = useState('Copy Email'); 

  const copyEmail = () => {
    navigator.clipboard.writeText('contact.bdafricanmarket@gmail.com');
    setTooltipText('Copied!'); 

    setTimeout(() => {
      setTooltipText('Copy Email');
    }, 1500);
  };

  return (
    <div className={SpecialCompanyStaticOffersStyle['offers-container']}>

      <div className={SpecialCompanyStaticOffersStyle['icon-truck']}>
        <i className="fa fa-truck" title="Special Offer"></i>
        <p>Exclusive Deals</p>
        <p className={SpecialCompanyStaticOffersStyle['offer-description']}>10% off when referred and 20% off on purchases over $200.</p>
      </div>

      <div className={SpecialCompanyStaticOffersStyle['icon-phone']} onClick={copyEmail}>
        <i className="fa fa-phone" title="Contact Us"></i>
        <p>Need Assistance?</p>
        <p className={SpecialCompanyStaticOffersStyle['email-description']}>
          <span className={SpecialCompanyStaticOffersStyle['tooltip']}>
            contact.bdafricanmarket@gmail.com
            <span className={SpecialCompanyStaticOffersStyle['tooltiptext']}>
              {tooltipText}
            </span>
          </span>
        </p>
      </div>

      <div className={SpecialCompanyStaticOffersStyle['icon-gift']}>
        <i className="fa fa-gift" title="Money Back Guarantee"></i>
        <p>No-Risk Satisfaction</p>
        <p className={SpecialCompanyStaticOffersStyle['offer-description']}>100% money-back guarantee. Shop with confidence.</p>
      </div>

      <div className={SpecialCompanyStaticOffersStyle['icon-undo']}>
        <i className="fa fa-undo" title="30-Day Returns"></i>
        <p><a href="/return-policy" className={SpecialCompanyStaticOffersStyle['link']}>Unbeatable Return Policy</a></p>
        <p className={SpecialCompanyStaticOffersStyle['offer-description']}>30-day hassle-free returns because your satisfaction matters.</p>
      </div>

    </div>
  );
}

export default SpecialCompanyStaticOffers;
