import { createMollieClient } from '@mollie/api-client';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { sendConfirmationEmail } from '@/lib/email';

const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
});

// Mollie sends form-urlencoded data
export async function POST(request: Request) {
    try {
        const text = await request.text();
        const params = new URLSearchParams(text);
        const paymentId = params.get('id');

        if (!paymentId) {
            return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
        }

        const payment = await mollieClient.payments.get(paymentId);

        if (payment.status === 'paid') {
            const metadata = payment.metadata as any;
            const { duoName, email, date } = metadata;
            const type = metadata.type;

            if (type === 'deposit') {
                // Update DB status
                await sql`
                    UPDATE bookings 
                    SET status = 'deposit_paid' 
                    WHERE mollie_payment_id = ${paymentId}
                `;

                // Send Confirmation Email
                // Note: In production you might want to fetch the exact booking details from DB
                await sendConfirmationEmail(
                    email,
                    duoName,
                    date,
                    'Confirmed', // You might want to store/retrieve time too
                    parseFloat(payment.amount.value),
                    300.00 - parseFloat(payment.amount.value) // Assuming fixed total
                );
            } else if (type === 'balance') {
                // Update DB status to fully_paid
                const metadata = payment.metadata as any;
                await sql`
                    UPDATE bookings 
                    SET status = 'fully_paid' 
                    WHERE mollie_payment_id = ${paymentId} OR id = ${metadata.bookingId}
                `;
            }
        }

        return NextResponse.json({ status: 'ok' });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
