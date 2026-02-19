'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
    { id: 1, src: '/FX5A8335p.jpg', alt: 'Fashion Duo 1' },
    { id: 2, src: '/beeld2.jpg', alt: 'Fashion Duo 2' },
    { id: 3, src: '/beeld3.jpg', alt: 'Fashion Duo 3' },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            <div className="slider-wrapper">
                <AnimatePresence mode="popLayout">
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="slide active"
                                style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                            >
                                <div className="slide-layers"></div>
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.65)' }}
                                    priority={index === 0}
                                />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            <div className="hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Unieke portretten
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}
                >
                    Het vastleggen van de unieke band en stijl van duo fotografie.
                </motion.div>
                <motion.a
                    href="#portfolio"
                    className="btn"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 1 }}
                >
                    Bekijk Portfolio
                </motion.a>
            </div>
        </section>
    );
}
