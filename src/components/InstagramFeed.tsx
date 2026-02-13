'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const feedImages = [
    '/images/instagram/feed-1.png',
    '/images/instagram/feed-2.png',
    '/images/instagram/feed-3.png',
    '/images/instagram/feed-4.png',
];

export default function InstagramFeed() {
    return (
        <section className="instagram-feed" style={{ padding: '4rem 0', background: '#fafafa' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--color-muted)' }}>Follow Us</p>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
                    <a href="https://www.instagram.com/kidz.management/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        @kidz.management
                    </a>
                </h3>
            </div>

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {feedImages.map((src, index) => (
                        <motion.a
                            key={index}
                            href="https://www.instagram.com/kidz.management/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, opacity: 0.8 }}
                            style={{ position: 'relative', aspectRatio: '1/1', display: 'block', overflow: 'hidden', borderRadius: '4px' }}
                        >
                            <Image
                                src={src}
                                alt={`Instagram post ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
