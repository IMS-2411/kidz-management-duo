'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactPage() {
    return (
        <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                {/* Left: Content & Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>CONTACT</h1>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.8 }}>
                        KIN portraits B.V.<br />
                        Verrijn Stuartweg 26M<br />
                        1112AX Amsterdam
                    </p>
                    <p style={{ marginBottom: '2rem' }}>
                        <a href="mailto:info@kidzmanagement.nl" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '1px solid var(--color-accent)' }}>
                            info@kidzmanagement.nl
                        </a>
                    </p>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                        <div className="form-group">
                            <label htmlFor="name">Naam</label>
                            <input type="text" id="name" className="form-control" placeholder="Jouw naam" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" className="form-control" placeholder="jouw@email.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Onderwerp</label>
                            <input type="text" id="subject" className="form-control" placeholder="Onderwerp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Bericht</label>
                            <textarea id="message" rows={5} className="form-control" placeholder="Jouw bericht"></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Verstuur Bericht</button>
                    </form>
                </motion.div>

                {/* Right: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '4px', overflow: 'hidden' }}
                >
                    <Image
                        src="/images/contact_bw_child.png"
                        alt="Contact Kidz Management"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
