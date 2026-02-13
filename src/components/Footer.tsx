import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container">
                <p>&copy; 2025 Duo-kidz Photography. All rights reserved.</p>
                <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                    <Link href="/terms" style={{ marginRight: '1rem', borderBottom: '1px solid transparent' }}>
                        Algemene Voorwaarden
                    </Link>
                    <Link href="/privacy" style={{ borderBottom: '1px solid transparent' }}>
                        Privacyverklaring
                    </Link>
                </div>
            </div>
        </footer>
    );
}
