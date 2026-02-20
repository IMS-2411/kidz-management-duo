'use client';

import { useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

export default function BookingSection() {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('');
    const [names, setNames] = useState<string>(''); // namen van personen in de shoot
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // In je huidige backend heet dit nog "duoName".
    // Voor kin portraits gebruiken we dit als sessie-label.
    const duoName = 'kin portraits';

    const timeRanges = useMemo(
        () => [
            { start: 13 * 60, end: 18 * 60 },
            { start: 18 * 60 + 30, end: 21 * 60 },
        ],
        []
    );

    const timeSlots = useMemo(() => {
        const slots: string[] = [];
        for (const range of timeRanges) {
            for (let minutes = range.start; minutes <= range.end; minutes += 30) {
                const h = Math.floor(minutes / 60);
                const m = minutes % 60;
                const t = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                slots.push(t);
            }
        }
        return slots;
    }, [timeRanges]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !time) {
            alert('Selecteer een datum en tijd.');
            return;
        }
        if (!names.trim()) {
            alert('Vul de namen in van de personen die op de foto komen.');
            return;
        }
        if (!email.trim()) {
            alert('Vul je e-mail in.');
            return;
        }

        setLoading(true);

        try {
            const formattedDate = date.toISOString().split('T')[0];

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    duoName,
                    names,
                    email,
                    date: formattedDate,
                    time,
                }),
            });

            const data = await response.json();

            if (data?.error) {
                alert(data.error);
                return;
            }

            // jouw API geeft: { checkoutUrl: payment.getCheckoutUrl() }
            if (data?.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                alert('Kon geen Mollie checkout-link ophalen.');
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
                        <p>Boeken</p>
                        <h2>Boek een shoot</h2>
                    </div>

                    <p style={{ color: 'var(--color-muted)', maxWidth: '460px', marginBottom: '1.5rem' }}>
                        Je bevestigt je boeking met een <strong>aanbetaling van 50%</strong>.
                        Het resterende bedrag betaal je pas <strong>na de fotoshoot</strong>, vlak vóór levering van de bewerkte foto’s.
                    </p>

                    <p style={{ color: 'var(--color-muted)', maxWidth: '460px', marginBottom: 0 }}>
                        Na een succesvolle betaling ontvang je per e-mail een <strong>PDF met instructies</strong> ter voorbereiding op de shoot.
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
                        <label htmlFor="bookingDate">Datum</label>
                        <small style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                            Beschikbare dagen worden gemarkeerd.
                        </small>

                        <Flatpickr
                            className="form-control"
                            placeholder="Selecteer datum"
                            options={{
                                minDate: 'today',
                                disableMobile: true,
                                disable: [
                                    function (d) {
                                        return d.getDay() !== 0 && d.getDay() !== 6;
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
                        <label>Tijd</label>
                        <div className="time-slots-grid">
                            {!date ? (
                                <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.9rem', padding: '1rem' }}>
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
                        <label htmlFor="names">Namen (personen op de foto)</label>
                        <input
                            type="text"
                            id="names"
                            className="form-control"
                            placeholder="Bijv. Emma &amp; Sophie / Mila, papa, oma"
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="jij@voorbeeld.nl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Bezig…' : 'Betaal aanbetaling (50%)'}
                    </button>

                    <small style={{ display: 'block', marginTop: '0.75rem', color: 'var(--color-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                        Je wordt doorgestuurd naar een beveiligde Mollie betaalomgeving (iDEAL).
                    </small>
                </form>
            </div>
        </section>
    );
}