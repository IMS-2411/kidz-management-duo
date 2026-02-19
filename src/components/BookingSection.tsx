'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

export default function BookingSection() {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Time Ranges: 13:00-18:00 AND 18:30-21:00
    const timeRanges = [
        { start: 13 * 60, end: 18 * 60 },
        { start: 18 * 60 + 30, end: 21 * 60 },
    ];

    const generateTimeSlots = () => {
        const slots: string[] = [];
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
            alert('Selecteer een datum en tijd.');
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
                alert('Kon geen betaal-link ophalen.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Er ging iets mis.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="booking" className="booking-section section-padding">
            <div className="container booking-wrapper">
                <div className="booking-info">
                    <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <p>Beschikbaarheid</p>
                        <h2>Boek je sessie</h2>
                    </div>

                    <p style={{ color: 'var(--color-muted)', maxWidth: '420px', marginBottom: '2rem' }}>
                        We openen elke maand een beperkt aantal data voor private portretsessies.
                        Kies een datum, selecteer een tijd en bevestig je boeking veilig.
                    </p>

                    <div style={{ marginTop: '2rem' }}>
                        <p style={{ color: 'var(--color-text)', fontWeight: 500, marginBottom: '0.5rem' }}>
                            Contact
                        </p>
                        <a
                            href="mailto:info@kidzmanagement.nl"
                            style={{
                                color: 'var(--color-text)',
                                fontWeight: 500,
                                textDecoration: 'underline',
                                textUnderlineOffset: '4px',
                            }}
                        >
                            info@kidzmanagement.nl
                        </a>
                    </div>
                </div>

                <form className="booking-form" onSubmit={handleBooking}>
                    <div className="form-group">
                        <label htmlFor="bookingDate">Kies een datum</label>
                        <small
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--color-muted)',
                                fontSize: '0.8rem',
                            }}
                        >
                            Beschikbare dagen zijn gemarkeerd (weekenden).
                        </small>

                        <Flatpickr
                            className="form-control"
                            placeholder="Selecteer datum"
                            options={{
                                minDate: 'today',
                                disableMobile: true,
                                disable: [
                                    function (date) {
                                        return date.getDay() !== 0 && date.getDay() !== 6;
                                    },
                                ],
                                onDayCreate: function (dObj, dStr, fp, dayElem) {
                                    const day = dayElem.dateObj.getDay();
                                    if (day === 0 || day === 6) dayElem.classList.add('available-day');
                                    else dayElem.classList.add('unavailable-day');
                                },
                            }}
                            value={date || undefined}
                            onChange={([selectedDate]) => {
                                setDate(selectedDate);
                                setTime('');
                            }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Kies een tijd</label>
                        <div className="time-slots-grid">
                            {!date ? (
                                <p
                                    style={{
                                        gridColumn: '1/-1',
                                        textAlign: 'center',
                                        color: 'var(--color-muted)',
                                        fontSize: '0.9rem',
                                        padding: '1rem',
                                    }}
                                >
                                    Selecteer eerst een datum om tijden te bekijken.
                                </p>
                            ) : (
                                timeSlots.map((slot) => (
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
                        <label htmlFor="name">Naam</label>
                        <input type="text" id="name" className="form-control" placeholder="Jouw naam" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" className="form-control" placeholder="Jouw e-mail" required />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Bezig…' : 'Ga door naar betaling'}
                    </button>
                </form>
            </div>
        </section>
    );
}