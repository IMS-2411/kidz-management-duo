import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(
    email: string,
    duoName: string,
    date: string,
    time: string,
    depositAmount: number,
    remainingAmount: number
) {
    try {
        await resend.emails.send({
            from: 'Kidz Management <bookings@resend.dev>', // Update this with your verified domain later
            to: email,
            subject: 'Booking Confirmation - Kidz Management Duo',
            html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${duoName},</p>
        <p>Your duo shoot has been booked successfully.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Deposit Paid:</strong> €${depositAmount.toFixed(2)}</li>
          <li><strong>Remaining Balance:</strong> €${remainingAmount.toFixed(2)}</li>
        </ul>
        <p>You will receive a payment link for the remaining balance 24 hours before your shoot.</p>
        <p>Kind regards,<br>The Kidz Management Team</p>
      `,
        });
    } catch (error) {
        console.error('Email Error:', error);
    }
}

export async function sendBalancePaymentEmail(
    email: string,
    duoName: string,
    paymentLink: string
) {
    try {
        await resend.emails.send({
            from: 'Kidz Management <bookings@resend.dev>',
            to: email,
            subject: 'Payment Reminder - Remaining Balance',
            html: `
          <h1>Upcoming Shoot Reminder</h1>
          <p>Dear ${duoName},</p>
          <p>Your shoot is coming up tomorrow! Please finalize your booking by paying the remaining balance.</p>
          <p><a href="${paymentLink}"><strong>Click here to pay the remaining balance</strong></a></p>
          <p>This payment must be completed before the shoot.</p>
          <p>Kind regards,<br>The Kidz Management Team</p>
        `,
        });
    } catch (error) {
        console.error('Email Error:', error);
    }
}
