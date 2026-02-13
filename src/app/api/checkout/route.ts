import { createMollieClient } from '@mollie/api-client';
import { NextResponse } from 'next/server';
import { createBooking } from '@/lib/db';

const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { duoName, names, email, date, time } = body;

        const totalAmount = 300.00;
        const depositAmount = totalAmount / 2; // 50% Deposit

        // 1. Create Mollie Payment for Deposit
        const payment = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: depositAmount.toFixed(2),
            },
            description: `Deposit: Duo Shoot - ${duoName} (${date})`,
            redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/success`,
            cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/cancel`,
            webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kidz-management-duo.vercel.app'}/api/webhooks/mollie`,
            metadata: {
                duoName,
                email,
                date,
                type: 'deposit'
            },
        });

        // 2. Store Booking in Database
        await createBooking(
            duoName,
            names,
            email,
            date,
            time,
            depositAmount,
            totalAmount,
            payment.id
        );

        return NextResponse.json({
            checkoutUrl: payment.getCheckoutUrl()
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
