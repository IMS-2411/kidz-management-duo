import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contact</h4>
                    <p>Kidz Management B.V.</p>
                    <p>Verrijn Stuartweg 26M</p>
                    <p>1112AX Amsterdam</p>
                    <p><a href="mailto:info@kidzmanagement.nl" style={{ color: 'var(--color-accent)' }}>info@kidzmanagement.nl</a></p>
                </div>

                <p style={{ opacity: 0.6 }}>&copy; 2026 Kidz Management B.V. All rights reserved.</p>

                <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                    <a href="https://kidzzz.amsterdam" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem', borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Webshop
                    </a>
                    <Link href="/terms" style={{ marginRight: '1rem', borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Terms & Conditions
                    </Link>
                    <Link href="/privacy" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
