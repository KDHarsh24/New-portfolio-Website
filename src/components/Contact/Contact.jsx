import React, { useEffect } from 'react';
import './Contact.css';
import { initContactAnimations } from './ContactAnim';

const Contact = () => {
    useEffect(() => {
        initContactAnimations();
    }, []);

    return (
        <section className="contact-web" id="contact">
            <div className="contact-marquee">
                <span>
                    Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / 
                </span>
            </div>
            <div className="contact-section">
                <div className="contact-details col">
                    <div className="social-media items">
                        <h3>Handles</h3>
                        <span>
                            <a href="https://github.com/KDHarsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">GitHub</a> 
                            <a href="https://www.linkedin.com/in/kdharsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">Linkedin</a>
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
                <div className="contact-form col">
                    <h4 className="mail-notification">Send an Email</h4>
                    <form className="contact-wrapper" id="myform" action="https://formsubmit.co/kdharsh24@gmail.com" method="POST">
                        <div className="contact-row">
                            <input type="text" placeholder="Name" name="name" className="hover-this" id="name"/>
                        </div>
                        <div className="contact-row">
                            <input type="email" placeholder="Email" name="email" className="hover-this" id="email"/>
                        </div>
                        <div className="contact-row">
                            <textarea name="message" 
                            id="message"
                            rows="4" placeholder="Message" className="hover-this"></textarea>
                        </div>
                        <div className="submit contact-row">
                            <button type="submit" className="hover-this">Submit
                                <div className="send-icon">
                                    <ion-icon name="arrow-forward-sharp"></ion-icon>
                                    <ion-icon name="arrow-forward-sharp"></ion-icon>
                                    <ion-icon name="arrow-forward-sharp"></ion-icon>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
