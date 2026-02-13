import * as Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function sendConfirmationEmail(
    email: string,
    duoName: string,
    date: string,
    time: string,
    depositAmount: number,
    remainingAmount: number
) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Booking Confirmation - Kidz Management Duo";
    sendSmtpEmail.htmlContent = `
    <html><body>
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
    </body></html>
  `;
    sendSmtpEmail.sender = { "name": "Kidz Management", "email": "bookings@kidzmanagement.nl" }; // Update with verified sender
    sendSmtpEmail.to = [{ "email": email, "name": duoName }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Brevo API called successfully. Returned data: ' + JSON.stringify(data));
    } catch (error) {
        console.error('Brevo API Error:', error);
    }
}

export async function sendBalancePaymentEmail(
    email: string,
    duoName: string,
    paymentLink: string
) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Payment Reminder - Remaining Balance";
    sendSmtpEmail.htmlContent = `
      <html><body>
          <h1>Upcoming Shoot Reminder</h1>
          <p>Dear ${duoName},</p>
          <p>Your shoot is coming up tomorrow! Please finalize your booking by paying the remaining balance.</p>
          <p><a href="${paymentLink}"><strong>Click here to pay the remaining balance</strong></a></p>
          <p>This payment must be completed before the shoot.</p>
          <p>Kind regards,<br>The Kidz Management Team</p>
      </body></html>
    `;
    sendSmtpEmail.sender = { "name": "Kidz Management", "email": "bookings@kidzmanagement.nl" };
    sendSmtpEmail.to = [{ "email": email, "name": duoName }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Brevo API called successfully. Returned data: ' + JSON.stringify(data));
    } catch (error) {
        console.error('Brevo API Error:', error);
    }
}
