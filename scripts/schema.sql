CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  duo_name VARCHAR(255) NOT NULL,
  names VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, deposit_paid, fully_paid, cancelled
  deposit_amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  mollie_payment_id VARCHAR(255),
  balance_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
