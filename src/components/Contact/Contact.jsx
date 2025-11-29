import React, { useEffect } from 'react';
import './Contact.css';
import { initContactAnimations } from './ContactAnim';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

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
                <ContactInfo />
                <ContactForm />
            </div>
        </section>
    );
};

export default Contact;
