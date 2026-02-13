import { sql } from '@vercel/postgres';

export async function createBooking(
  duoName: string,
  names: string,
  email: string,
  date: string,
  time: string,
  depositAmount: number,
  totalAmount: number,
  molliePaymentId: string
) {
  try {
    // Ensure table exists (for first run, though ideally run migration manually)
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        duo_name VARCHAR(255) NOT NULL,
        names VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(10) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        deposit_amount DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        mollie_payment_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const result = await sql`
      INSERT INTO bookings (duo_name, names, email, date, time, deposit_amount, total_amount, mollie_payment_id)
      VALUES (${duoName}, ${names}, ${email}, ${date}, ${time}, ${depositAmount}, ${totalAmount}, ${molliePaymentId})
      RETURNING id;
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create booking in database');
  }
}

export async function getUnpaidBookingsForTomorrow() {
  try {
    // Get tomorrow's date in YYYY-MM-DD format
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];

    // Query for bookings where date is tomorrow AND status is 'deposit_paid'
    // This assumes you are using Vercel Postgres (Neon)
    const result = await sql`
      SELECT * FROM bookings 
      WHERE date = ${dateString}::date 
      AND status = 'deposit_paid'
    `;

    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch unpaid bookings');
  }
}

export async function updateBookingPaymentLink(id: number, paymentId: string) {
  try {
    await sql`
            UPDATE bookings
            SET balance_payment_id = ${paymentId}
            WHERE id = ${id}
        `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update booking payment link');
  }
}
