import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/" className="logo">
                Kidz Management
            </Link>
            <nav>
                <Link href="/#portfolio">Portfolio</Link>
                <Link href="/publications">Publications</Link>
                <Link href="/#booking">Book Shoot</Link>
            </nav>
        </header>
    );
}
