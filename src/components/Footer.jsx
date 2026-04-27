import React from "react";
import { footerStyles } from "../assets/dummyStyles";
import logo from '../assets/logo.jpeg'
import {
    Stethoscope,
    Activity,
    Phone,
    Mail,
    MapPin,
    Send
} from "lucide-react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={footerStyles.footerContainer}>

            {/* Floating Icons */}
            <div className={footerStyles.floatingIcon1}>
                <Stethoscope className={footerStyles.stethoscopeIcon} />
            </div>
            <div className={footerStyles.floatingIcon2}>
                <Activity className={footerStyles.activityIcon} />
            </div>

            <div className={footerStyles.mainContent}>
                <div className={footerStyles.gridContainer}>

                    {/* Company Section */}
                    <div className={footerStyles.companySection}>
                        <div className={footerStyles.logoContainer}>
                            <div className={footerStyles.logoWrapper}>
                                <div className={footerStyles.logoImageContainer}>
                                    <img src={logo} alt="logo" className={footerStyles.logoImage} />
                                </div>
                            </div>
                            <div>
                                <h2 className={footerStyles.companyName}>MediCare</h2>
                                <p className={footerStyles.companyTagline}>Smart Healthcare</p>
                            </div>
                        </div>

                        <p className={footerStyles.companyDescription}>
                            Providing advanced hospital management solutions with secure and efficient healthcare services.
                        </p>

                        {/* Contact */}
                        <div className={footerStyles.contactContainer}>
                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <Phone className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>+91 9876543210</span>
                            </div>

                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <Mail className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>support@medicare.com</span>
                            </div>

                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <MapPin className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={footerStyles.linksSection}>
                        <h3 className={footerStyles.sectionTitle}>Quick Links</h3>
                        <ul className={footerStyles.linksList}>
                            {["Home", "Doctors", "Appointments", "Services"].map((item, i) => (
                                <li key={i} className={footerStyles.linkItem}>
                                    <a href="#" className={footerStyles.quickLink}>
                                        <span className={footerStyles.quickLinkIconWrapper}>➤</span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className={footerStyles.linksSection}>
                        <h3 className={footerStyles.sectionTitle}>Services</h3>
                        <ul className={footerStyles.linksList}>
                            {["Emergency Care", "Lab Tests", "ICU", "Pharmacy"].map((item, i) => (
                                <li key={i} className={footerStyles.linkItem}>
                                    <a href="#" className={footerStyles.serviceLink}>
                                        <span className={footerStyles.serviceIcon}></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className={footerStyles.newsletterSection}>
                        <h3 className={footerStyles.newsletterTitle}>Subscribe</h3>
                        <p className={footerStyles.newsletterDescription}>
                            Get updates on healthcare services and offers.
                        </p>

                        {/* Mobile */}
                        <div className={footerStyles.mobileNewsletterContainer}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={footerStyles.emailInput}
                            />
                            <button className={footerStyles.mobileSubscribeButton}>
                                <Send className={footerStyles.mobileButtonIcon} />
                                Subscribe
                            </button>
                        </div>

                        {/* Desktop */}
                        <div className={footerStyles.desktopNewsletterContainer}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={footerStyles.desktopEmailInput}
                            />
                            <button className={footerStyles.desktopSubscribeButton}>
                                <Send className={footerStyles.desktopButtonIcon} />
                                <span className={footerStyles.desktopButtonText}>
                                    Subscribe
                                </span>
                            </button>
                        </div>

                        {/* Social */}
                        <div className={footerStyles.socialContainer}>
                            <FaFacebook className={`${footerStyles.socialIcon} ${footerStyles.facebookColor}`} />
                            <FaTwitter className={`${footerStyles.socialIcon} ${footerStyles.twitterColor}`} />
                            <FaInstagram className={`${footerStyles.socialIcon} ${footerStyles.instagramColor}`} />
                            <FaLinkedin className={`${footerStyles.socialIcon} ${footerStyles.linkedinColor}`} />
                            <FaYoutube className={`${footerStyles.socialIcon} ${footerStyles.youtubeColor}`} />
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className={footerStyles.bottomSection}>
                    <p className={footerStyles.copyright}>
                        © 2026 MediCare. All rights reserved.
                    </p>
                    <p className={footerStyles.designerText}>
                       
                        <span className={footerStyles.designerLink}>
                           
                        </span>
                    </p>
                </div>
            </div>

            {/* Animation */}
            <style>{footerStyles.animationStyles}</style>
        </footer>
    );
};

export default Footer;