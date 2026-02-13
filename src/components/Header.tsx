'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <Link href="/" className="logo">
                Kidz Management
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-nav">
                <Link href="/#portfolio">Portfolio</Link>
                <Link href="/publications">Publications</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/#booking">Book Shoot</Link>
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
                <Link href="/publications" onClick={() => setIsOpen(false)}>Publications</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                <Link href="/#booking" onClick={() => setIsOpen(false)}>Book Shoot</Link>
            </div>
        </header>
    );
}
