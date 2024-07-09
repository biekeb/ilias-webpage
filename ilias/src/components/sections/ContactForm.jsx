import React from "react";
import ParticlesModel from "../ParticlesModel";

const ContactForm = () => {
  return (
    <div className="contact-form">
      <div className="form-container">
        <form>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" />

          <button type="submit" className="demo-button">
            BOOK YOUR DEMO
          </button>
        </form>
      </div>
      <div className="contact-info">
        {/* <ParticlesModel /> */}
        <h2>Contact Us</h2>
        <p>
          It is very important for us to keep in touch with you, so we are
          always ready to answer any question that interests you. Shoot!
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
