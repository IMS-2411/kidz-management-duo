import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    // apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
    try {
        const { date, time } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Duo Photoshoot Booking',
                            description: `Booking for ${date} at ${time}`,
                        },
                        unit_amount: 15000, // €150.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Dynamic success/cancel URLs based on origin
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            metadata: {
                bookingDate: date,
                bookingTime: time,
            },
        });

        return NextResponse.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
