export default function TermsPage() {
    return (
        <div className="container section-padding">
            <div className="section-header">
                <p>Legal</p>
                <h2>Terms & Conditions</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <p><strong>General Booking Conditions KIN portraits B.V.</strong></p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 1: GENERAL</h3>
                <p>1.1 These booking conditions apply to all agreements between a client and models booked through KIN portraits B.V. KIN portraits B.V. is authorized to represent the interests of the models.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 2: BOOKINGS</h3>
                <p>2.1 A booking agreement is a contract between the client and the Model established through KIN portraits B.V. The invoice amount includes standard rates, royalties, and a 20% agency fee.</p>
                <p>2.3 Models can be booked for a full day (8 hours) or a half day (4 hours).</p>
                <p>2.4 No-show fee is &euro;175 per missed booking if the model fails to appear without notice.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 3: STANDARD RATES</h3>
                <p>3.3 Recordings may be used for small-scale publications in the Netherlands (Retail posters &lt;2 months, Ads &lt;2 months, etc) included in the rate.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 11: CANCELLATIONS</h3>
                <p>10.1 Cancellation &gt;48 hours in advance: No costs.<br />
                    Cancellation &lt;48 hours: 50% of invoice amount.<br />
                    Cancellation on booking date: 100% of invoice amount.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 15: CHILDREN AND LABOR</h3>
                <p>14.1 Strict rules apply to models under 13 (prohibition of child labor) and 13-18. Clients must request exemptions from the Labor Inspection if required.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 18: GDPR</h3>
                <p>Kidz Management B.V. adheres to the General Data Protection Regulation (GDPR). Parents grant consent for use of photos for obtaining assignments.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Article 21: DISPUTE RESOLUTION</h3>
                <p>These booking conditions are subject exclusively to Dutch law. Competent court: Amsterdam.</p>

                <div style={{ marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    <p>For the full legal text including Articles 4-10, 12-14, 16-17, 19-20, and 22-23, please refer to the official document provided upon booking or contact us at info@kidzmanagement.nl.</p>
                </div>
            </div>
        </div>
    );
}
