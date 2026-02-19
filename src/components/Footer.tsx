import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Contact</h4>
                    <p>KIN portraits B.V.</p>
                    <p>Verrijn Stuartweg 26M</p>
                    <p>1112AX Amsterdam</p>
                    <p><a href="mailto:info@kidzmanagement.nl" style={{ color: 'var(--color-accent)' }}>info@kidzmanagement.nl</a></p>
                </div>

                <p style={{ opacity: 0.6 }}>&copy; 2026 KIN portraits. Alle rechten voorbehouden.</p>

                <div style={{ marginTop: '1rem', fontSize: '0.8rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/scouting" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Word gescout
                    </Link>
                    <a href="https://kidzzz.amsterdam" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Webshop
                    </a>
                    <Link href="/contact" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Contact
                    </Link>
                    <Link href="/terms" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Algemene Voorwaarden
                    </Link>
                    <Link href="/privacy" style={{ borderBottom: '1px solid transparent', color: 'inherit', textDecoration: 'none' }}>
                        Privacybeleid
                    </Link>
                </div>
            </div>
        </footer>
    );
}
