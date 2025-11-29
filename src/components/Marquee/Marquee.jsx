import React, { useState } from 'react';
import './Marquee.css';
import { setCursorText, setCursorGrow } from '../Cursor/CursorAnim';

const companies = [
    { 
        name: "Google", 
        about: "A global technology leader specializing in internet services, search engines, cloud computing, and artificial intelligence.",
        role: "Senior Engineer", 
        timeline: "2022 - Present",
        desc: "Led the development of next-gen search algorithms and improved query latency by 40%. Collaborated with AI teams to integrate LLMs into search results.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    { 
        name: "Microsoft", 
        about: "A multinational corporation producing computer software, consumer electronics, personal computers, and related services.",
        role: "Full Stack Developer", 
        timeline: "2020 - 2022",
        desc: "Contributed to the Azure portal UI, implementing accessible and responsive components. Optimized backend services for high-scale data processing.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
    },
    { 
        name: "Amazon", 
        about: "A technology giant focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
        role: "Backend Engineer", 
        timeline: "2018 - 2020",
        desc: "Designed and maintained microservices for AWS Lambda. Improved system reliability and reduced downtime during peak traffic events.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    { 
        name: "Netflix", 
        about: "A subscription-based streaming service and production company offering a library of films and television series.",
        role: "UI/UX Engineer", 
        timeline: "2016 - 2018",
        desc: "Revamped the user profile interface, resulting in a 15% increase in user engagement. Conducted A/B testing for new feature rollouts.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    }
];

const Marquee = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleMouseEnter = () => {
        setCursorText('Know More <ion-icon name="star" style="font-size: 1em; vertical-align: middle; margin-left: 5px;"></ion-icon>');
    };

    const handleMouseLeave = () => {
        setCursorText("");
    };

    const handleItemClick = (company) => {
        setSelectedCompany(company);
    };

    const closeDialog = () => {
        setSelectedCompany(null);
        setCursorGrow(false); // Ensure cursor resets
    };

    return (
        <section className="marquee-section" id="experience">
            <div className="marquee-header-container">
                <h2 className="marquee-heading">Worked </h2>
                <h2 className='marquee-heading'>With</h2>
            </div>
            <div className="marquee-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="marquee-content">
                    {companies.map((company, index) => (
                        <div 
                            key={index} 
                            className="marquee-item"
                            onClick={() => handleItemClick(company)}
                        >
                            <span className="company-name">{company.name}</span>
                            <img src={company.logo} alt={company.name} className="company-logo" />
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {companies.map((company, index) => (
                        <div 
                            key={`dup-1-${index}`} 
                            className="marquee-item"
                            onClick={() => handleItemClick(company)}
                        >
                            <span className="company-name">{company.name}</span>
                            <img src={company.logo} alt={company.name} className="company-logo" />
                        </div>
                    ))}
                    {/* Duplicate again for seamless loop since list is short */}
                    {companies.map((company, index) => (
                        <div 
                            key={`dup-2-${index}`} 
                            className="marquee-item"
                            onClick={() => handleItemClick(company)}
                        >
                            <span className="company-name">{company.name}</span>
                            <img src={company.logo} alt={company.name} className="company-logo" />
                        </div>
                    ))}
                </div>
            </div>

            {selectedCompany && (
                <div className="company-dialog-overlay" onClick={closeDialog}>
                    <div className="company-dialog" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="close-dialog-btn" 
                            onClick={closeDialog}
                        >
                            &times;
                        </button>
                        
                        <div className="dialog-header">
                            <img src={selectedCompany.logo} alt={selectedCompany.name} className="dialog-logo-img" />
                            <h2 className="dialog-title">{selectedCompany.name}</h2>
                        </div>

                        <div className="dialog-body">
                            <div className="dialog-section">
                                <h5 className="dialog-label">About Company</h5>
                                <p className="dialog-text">{selectedCompany.about}</p>
                            </div>

                            <div className="dialog-section">
                                <h5 className="dialog-label">My Role</h5>
                                <div className="role-timeline-wrapper">
                                    <p className="dialog-role-text">{selectedCompany.role}</p>
                                    <span className="dialog-timeline">{selectedCompany.timeline}</span>
                                </div>
                            </div>

                            <div className="dialog-section">
                                <h5 className="dialog-label">Contributions</h5>
                                <p className="dialog-text">{selectedCompany.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Marquee;
