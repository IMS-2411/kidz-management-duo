import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/" className="logo">
                Kidz Management
            </Link>
            <nav>
                <Link href="/#portfolio">Portfolio</Link>
                <Link href="/scouting">Get Scouted</Link>
                <a href="https://kidzzz.amsterdam" target="_blank" rel="noopener noreferrer">Webshop</a>
                <Link href="/#booking">Book Shoot</Link>
                <Link href="/#contact">Contact</Link>
            </nav>
        </header>
    );
}
