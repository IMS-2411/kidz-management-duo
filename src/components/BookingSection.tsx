'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { loadStripe } from '@stripe/stripe-js';
import 'flatpickr/dist/themes/light.css';

// Replace with your Stripe Public Key
const stripePromise = loadStripe('pk_test_ADD_YOUR_KEY_HERE');

export default function BookingSection() {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Time Ranges: 13:00-18:00 AND 18:30-21:00
    const timeRanges = [
        { start: 13 * 60, end: 18 * 60 },      // 1:00 PM - 6:00 PM
        { start: 18 * 60 + 30, end: 21 * 60 }  // 6:30 PM - 9:00 PM
    ];

    const generateTimeSlots = () => {
        const slots = [];
        for (const range of timeRanges) {
            for (let minutes = range.start; minutes <= range.end; minutes += 30) {
                const h = Math.floor(minutes / 60);
                const m = minutes % 60;
                const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) {
            alert('Please select a date and time.');
            return;
        }

        setLoading(true);

        try {
            const formattedDate = date.toISOString().split('T')[0];

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: formattedDate, time }),
            });

            const session = await response.json();

            if (session.error) {
                alert(session.error);
                setLoading(false);
                return;
            }

            if (session.url) {
                window.location.href = session.url;
            } else {
                alert('Could not retrieve payment URL.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="booking" className="booking-section section-padding">
            <div className="container booking-wrapper">
                <div className="booking-info">
                    <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <p>Availability</p>
                        <h2>Book Your Session</h2>
                    </div>
                    <p style={{ color: 'var(--color-muted)', maxWidth: '400px', marginBottom: '2rem' }}>
                        We open specific dates each month for duo sessions. Secure your spot early.
                        For special requests or editorial work, please contact us directly.
                    </p>

                    <div style={{ marginTop: '2rem' }}>
                        <p style={{ color: 'var(--color-text)', fontWeight: 700, marginBottom: '0.5rem' }}>Contact</p>
                        <a href="mailto:email@duo-kidz.nl" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>email@duo-kidz.nl</a>
                    </div>
                </div>

                <form className="booking-form" onSubmit={handleBooking}>
                    <div className="form-group">
                        <label htmlFor="bookingDate">Choose a Date</label>
                        <small style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                            Available: Sat & Sun (Green)
                        </small>
                        <Flatpickr
                            className="form-control"
                            placeholder="Select Date"
                            options={{
                                minDate: "today",
                                disableMobile: true,
                                disable: [
                                    function (date) {
                                        return (date.getDay() !== 0 && date.getDay() !== 6);
                                    }
                                ],
                                onDayCreate: function (dObj, dStr, fp, dayElem) {
                                    const day = dayElem.dateObj.getDay();
                                    if (day === 0 || day === 6) {
                                        dayElem.classList.add("available-day");
                                    } else {
                                        dayElem.classList.add("unavailable-day");
                                    }
                                }
                            }}
                            value={date || undefined}
                            onChange={([selectedDate]) => {
                                setDate(selectedDate);
                                setTime(''); // Reset time when date changes
                            }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Choose a Time</label>
                        <div className="time-slots-grid">
                            {!date ? (
                                <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.9rem', padding: '1rem' }}>
                                    Select a date to view available times
                                </p>
                            ) : (
                                timeSlots.map(slot => (
                                    <button
                                        key={slot}
                                        type="button"
                                        className={`time-slot-btn ${time === slot ? 'selected' : ''}`}
                                        onClick={() => setTime(slot)}
                                    >
                                        {slot}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Your Name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="Your Email" required />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Processing...' : 'Process Payment'}
                    </button>
                </form>
            </div>
        </section>
    );
}
