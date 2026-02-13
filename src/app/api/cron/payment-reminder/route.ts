import { NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { getUnpaidBookingsForTomorrow, updateBookingPaymentLink } from '@/lib/db';
import { sendBalancePaymentEmail } from '@/lib/email';

const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
});

export async function GET(request: Request) {
    // Verify Vercel Cron Secret (optional but recommended)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const bookings = await getUnpaidBookingsForTomorrow();
        const results = [];

        for (const booking of bookings) {
            // Create Payment for Remaining Balance (50%)
            const balanceAmount = (Number(booking.total_amount) - Number(booking.deposit_amount)).toFixed(2);

            const payment = await mollieClient.payments.create({
                amount: {
                    currency: 'EUR',
                    value: balanceAmount,
                },
                description: `Balance: Duo Shoot - ${booking.duo_name} (${booking.date})`,
                redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/success`,
                cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/cancel`,
                webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/api/webhooks/mollie`,
                metadata: {
                    bookingId: booking.id,
                    duoName: booking.duo_name,
                    email: booking.email,
                    type: 'balance'
                },
            });

            // Update DB with new payment ID
            await updateBookingPaymentLink(booking.id, payment.id);

            // Send Email
            const checkoutUrl = payment.getCheckoutUrl();
            if (checkoutUrl) {
                await sendBalancePaymentEmail(booking.email, booking.duo_name, checkoutUrl);
                results.push({ bookingId: booking.id, status: 'sent', email: booking.email });
            } else {
                results.push({ bookingId: booking.id, status: 'error', error: 'No checkout URL' });
            }
        }

        return NextResponse.json({ success: true, processed: results.length, details: results });

    } catch (error) {
        console.error('Cron Job Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
