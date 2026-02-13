import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/" className="logo">
                Duo-kidz
            </Link>
            <nav>
                <Link href="#portfolio">Portfolio</Link>
                <Link href="#booking">Book Shoot</Link>
                <Link href="#contact">Contact</Link>
            </nav>
        </header>
    );
}
