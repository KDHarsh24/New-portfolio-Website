import React, { useEffect, useRef, useState } from 'react';
import { addHoverEffect, removeHoverEffect } from '../Cursor/CursorAnim';
import ContactStars from './ContactStars';
import ContactBlackhole from './ContactBlackhole';

const ContactForm = () => {
    const submitBtnRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const btn = submitBtnRef.current;
        if (btn) {
            addHoverEffect(btn);
        }
        return () => {
            if (btn) {
                removeHoverEffect(btn);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const button = submitBtnRef.current;
        if (!button || button.classList.contains('sent') || button.classList.contains('blast') || isSubmitting) return;

        setIsSubmitting(true);
        const span = button.querySelector('.btn-content span');
        const originalText = span ? span.textContent : 'Submit';
        if (span) span.textContent = 'Sending...';

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const endpoint = import.meta.env.VITE_SEND_MESSAGE || "https://formsubmit.co/ajax/kdharsh24@gmail.com";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success === "true" || response.ok) {
                // Trigger blast animation on success
                if (span) span.textContent = originalText; // Reset text briefly before blast or keep it? 
                // Actually, let's start the blast now
                button.classList.add('blast');
                
                setTimeout(() => {
                    if (span) span.textContent = 'Teleported';
                    button.classList.remove('blast');
                    button.classList.add('sent');
                    e.target.reset();
                }, 1200);
            } else {
                console.error("Submission failed", result);
                if (span) span.textContent = 'Failed';
                setTimeout(() => { if (span) span.textContent = originalText; }, 2000);
            }
        } catch (error) {
            console.error("Error submitting form", error);
            if (span) span.textContent = 'Error';
            setTimeout(() => { if (span) span.textContent = originalText; }, 2000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form col">
            <h4 className="mail-notification">Send a Message</h4>
            <form className="contact-wrapper" id="myform" onSubmit={handleSubmit}>
                <div className="contact-row">
                    <input type="text" placeholder="Name" name="name" className="hover-this small" id="name" required />
                </div>
                <div className="contact-row">
                    <input type="email" placeholder="Email" name="email" className="hover-this small" id="email" required />
                </div>
                <div className="contact-row">
                    <textarea name="message" 
                    id="message"
                    rows="4" placeholder="Message" className="hover-this" required></textarea>
                </div>
                <div className="submit contact-row">
                    <button type="submit" className="hover-this" ref={submitBtnRef} disabled={isSubmitting}>
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