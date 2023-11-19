import React from "react";
import PropTypes from "prop-types";
import styles from "./RegistrationTemplate.module.css";  

/**
 * RegistrationPageTemplate Component
 *
 * This component is a layout template used for the registration page in the application.
 * It provides a two-column layout, displaying an image alongside the registration form.
 *
 * Features:
 * - Flexible layout to accommodate a form component and an image.
 * - Responsive design to adapt to different screen sizes.
 * - Accepts a form component and an image URL as props, allowing for customization.
 *
 * Props:
 * - formComponent (PropTypes.element.isRequired): The registration form component to be displayed.
 * - imageUrl (PropTypes.string.isRequired): The URL of the image to be displayed alongside the form.
 *
 * Implementation:
 * - Utilizes CSS modules for styling, ensuring encapsulated styles specific to this component.
 * - Structured with a flexbox layout for responsive design.
 * - The image and form are rendered side by side, with the image on the left and the form on the right.
 *
 */

function RegistrationPageTemplate({ formComponent, imageUrl }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.colImage}>
            <img src={imageUrl} alt="registration form" className={styles.image} />
          </div>
          <div className={styles.colForm}>
            {formComponent}
          </div>
        </div>
      </div>
    </div>
  );
}

RegistrationPageTemplate.propTypes = {
  formComponent: PropTypes.element.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default RegistrationPageTemplate;
