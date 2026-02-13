import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '10rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#d32f2f' }}>
                <XCircle size={64} />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Booking Canceled</h1>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
                Your payment was not processed. No charges were made.
            </p>
            <Link href="/#booking" className="btn">
                Try Again
            </Link>
        </div>
    );
}
