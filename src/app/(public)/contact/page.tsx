'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
                setFormData({ name: '', phone: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We are here to help you 24/7</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <div className={styles.infoColumn}>
                            <h2>Get in Touch</h2>
                            <p className={styles.intro}>Have any questions? Reach out to us directly or fill the form.</p>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}><FaMapMarkerAlt /></div>
                                <div>
                                    <h3>Address</h3>
                                    <p>Lakshmi Chowk, Abbott Road, Montgomery Park, Lahore</p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}><FaPhone /></div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>0300-5556271</p>
                                    <a href="tel:03005556271" className="btn btn-primary btn-sm" style={{ marginTop: '10px' }}>Call Now</a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}><FaWhatsapp /></div>
                                <div>
                                    <h3>WhatsApp</h3>
                                    <p>0300-5556271</p>
                                    <a href="https://wa.me/923005556271" className="btn btn-success btn-sm" style={{ marginTop: '10px', backgroundColor: '#25D366', color: 'white' }}>Chat on WhatsApp</a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}><FaEnvelope /></div>
                                <div>
                                    <h3>Email</h3>
                                    <p>info@hotellahorecity.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formColumn}>
                            <h2>Send a Message</h2>

                            {status && (
                                <div className={`${styles.statusMessage} ${styles[status.type]}`}>
                                    {status.message}
                                </div>
                            )}

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Your Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.034785463725!2d74.3239!3d31.5661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b6194459f11%3A0x70!2sLakshmi%20Chowk!5e0!3m2!1sen!2s!4v1633000000000!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </section>
        </main>
    );
}
