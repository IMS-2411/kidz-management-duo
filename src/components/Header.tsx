'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src="/kin-logo.png"
                    alt="KIN portraits"
                    width={210}
                    height={70}
                    priority
                    style={{ objectFit: 'contain', height: '65px', width: 'auto' }}
                />
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-nav">
                <Link href="/#portfolio">Portfolio</Link>
                <Link href="/publications">Publicaties</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/#booking">Boek Shoot</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
                <Link href="/#portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
                <Link href="/publications" onClick={() => setIsOpen(false)}>Publicaties</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                <Link href="/#booking" onClick={() => setIsOpen(false)}>Boek Shoot</Link>
            </div>
        </header>
    );
}
