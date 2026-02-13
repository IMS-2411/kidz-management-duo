'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const publications = [
    {
        id: 1,
        title: 'Vogue Kids',
        date: 'March 2025',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Vogue+Kids',
        description: 'Spring Collection Feature'
    },
    {
        id: 2,
        title: 'Milk Magazine',
        date: 'January 2025',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Milk+Magazine',
        description: 'Editorial Spread'
    },
    {
        id: 3,
        title: 'Hooligans',
        date: 'December 2024',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Hooligans',
        description: 'Cover Story'
    },
    {
        id: 4,
        title: 'Scimparello',
        date: 'November 2024',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Scimparello',
        description: 'Duo Special'
    },
    {
        id: 5,
        title: 'Luna Mag',
        date: 'October 2024',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Luna+Mag',
        description: 'Autumn Vibes'
    },
    {
        id: 6,
        title: 'Poster Child',
        date: 'September 2024',
        image: 'https://placehold.co/400x500/e0e0e0/1a1a1a?text=Poster+Child',
        description: 'Back to School'
    }
];

export default function PublicationsPage() {
    return (
        <div className="container section-padding">
            <div className="section-header">
                <p>Press & Features</p>
                <h2>Publications</h2>
            </div>

            <div className="grid-container">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="portfolio-item"
                        style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                    >
                        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                            <Image
                                src={pub.image}
                                alt={pub.title}
                                fill
                                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                className="hover-scale"
                                unoptimized // for external placeholder images
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '1.5rem',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                    color: 'white',
                                    transform: 'translateY(0)', // Always visible for publications? Or hover? Let's make it always visible or hover.
                                    // Let's stick to the portfolio style but maybe with text always visible or on hover?
                                    // User likes visual updates. Let's make it clean.
                                }}
                            >
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{pub.title}</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{pub.description}</p>
                                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>{pub.date}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
