'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
];

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            {HERO_IMAGES.map((img, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentImage ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${img})`, backgroundColor: '#333' }}
                ></div>
            ))}

            <div className={styles.content}>
                <div className="container">
                    <h1 className={styles.title}>Hotel Lahore City <br /> <span className={styles.subtitle}>Comfortable Stay in the Heart of Lahore</span></h1>
                    <p className={styles.description}>Affordable rooms with modern facilities located at Lakshmi Chowk, Abbott Road.</p>
                    <div className={styles.ctaGroup}>
                        <Link href="/rooms" className="btn btn-primary">Check Availability</Link>
                        <Link href="/contact" className="btn btn-outline">Call Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
