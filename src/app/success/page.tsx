import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '10rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#4caf50' }}>
                <CheckCircle size={64} />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Booking Confirmed!</h1>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
                Thank you for booking with Duo-kidz. You will receive a confirmation email shortly.
            </p>
            <Link href="/" className="btn">
                Return Home
            </Link>
        </div>
    );
}
