import React, { useEffect, useRef } from 'react';
import { addHoverEffect, removeHoverEffect } from '../Cursor/CursorAnim';
import ContactStars from './ContactStars';
import ContactBlackhole from './ContactBlackhole';

const ContactForm = () => {
    const submitBtnRef = useRef(null);

    useEffect(() => {
        const btn = submitBtnRef.current;
        if (btn) {
            addHoverEffect(btn);
        }

        const handleBlast = (ev) => {
            ev.preventDefault();
            const button = submitBtnRef.current;
            if (!button) return;
            if (button.classList.contains('sent') || button.classList.contains('blast')) return;
            button.classList.add('blast');
            button.disabled = true;

            setTimeout(() => {
                const span = button.querySelector('.btn-content span');
                if (span) span.textContent = 'Teleported';
                button.classList.remove('blast');
                button.classList.add('sent');
            }, 1200);
        };

        if (btn) btn.addEventListener('click', handleBlast);

        return () => {
            if (btn) {
                removeHoverEffect(btn);
                btn.removeEventListener('click', handleBlast);
            }
        };
    }, []);

    return (
        <div className="contact-form col">
            <h4 className="mail-notification">Send a Message</h4>
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
                    <button type="submit" className="hover-this" ref={submitBtnRef}>
                        <ContactStars />
                        <div className="btn-content">
                            <span>Submit</span>
                            <ContactBlackhole />
                        </div>
                        <div className="blast-overlay" aria-hidden="true"></div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;