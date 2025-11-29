import React from 'react';

const ContactInfo = () => {
    return (
        <div className="contact-details col">
            <div className="social-media items">
                <h3>Handles</h3>
                <span>
                    <a href="https://github.com/KDHarsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">
                        <ion-icon name="logo-github"></ion-icon> GitHub
                    </a> 
                    <a href="https://www.linkedin.com/in/kdharsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">
                        <ion-icon name="logo-linkedin"></ion-icon> Linkedin
                    </a>
                </span>
            </div>
            <div className="contact-info">
                <div className="email item">
                    <h3>Get in touch</h3>
                    <a href="mailto:harshkumardas24@gmail.com" className="social-link hover-this small">harshkumardas24@gmail.com</a>
                </div> 
                <div className="address item">
                    <h3>Location</h3>
                    Kolkata-INDIA
                </div>                   
            </div>
            <div className="map">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29434.727430265862!2d88.34856616798045!3d22.752708731374927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89aefcc6fe3a7%3A0x6a6d434ac504dbc5!2sBarrackpore%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1718899336347!5m2!1sen!2sin" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    className="mapPart"
                    title="map"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactInfo;