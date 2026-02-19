'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScoutingPage() {
    const [formData, setFormData] = useState({
        parentName: '',
        email: '',
        childName: '',
        age: '',
        height: '',
        instagram: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For now, we just simulate success. 
        // In a real app, this would POST to /api/scouting which uses Resend/SendGrid.
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', minHeight: '60vh' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Application Received</h1>
                    <p style={{ maxWidth: '500px', margin: '0 auto', color: 'var(--color-muted)' }}>
                        Thank you for your interest in "Face Fuzion".
                        We will review your application and contact you if there is a potential match for our duo shoots.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="btn"
                        style={{ marginTop: '2rem' }}
                    >
                        Submit Another
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container section-padding">
            <div className="section-header">
                <p>New Faces</p>
                <h2>Get Scouted</h2>
            </div>

            <div className="booking-wrapper" style={{ alignItems: 'start' }}>
                <div className="booking-info">
                    <h3 style={{ marginBottom: '1.5rem' }}>We are looking for unique duos.</h3>
                    <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                        Thank you for your interest in "KIN portraits".
                        KIN portraits is always scouting for new talent for our specialized portrait sessions and campaigns.
                    </p>
                    <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
                        Please fill out the form with your details.
                        For photos, please ensure you send a link to your portfolio or Instagram, or we will request them via email.
                    </p>

                    <ul style={{ listStyle: 'none', color: 'var(--color-text)', lineHeight: '2' }}>
                        <li><strong>Requirements:</strong></li>
                        <li>• Ages 4 - 16</li>
                        <li>• Based in The Netherlands or Belgium</li>
                        <li>• Unique sibling/duo connection</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="parentName">Parent / Guardian Name</label>
                        <input
                            type="text"
                            id="parentName"
                            className="form-control"
                            required
                            value={formData.parentName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label htmlFor="childName">Child(ren) Names</label>
                            <input
                                type="text"
                                id="childName"
                                className="form-control"
                                placeholder="e.g. Liam & Noah"
                                required
                                value={formData.childName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Ages</label>
                            <input
                                type="text"
                                id="age"
                                className="form-control"
                                placeholder="e.g. 6 & 8"
                                required
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram / Portfolio Link</label>
                        <input
                            type="url"
                            id="instagram"
                            className="form-control"
                            placeholder="https://instagram.com/..."
                            value={formData.instagram}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">About the Duo</label>
                        <textarea
                            id="message"
                            className="form-control"
                            rows={4}
                            placeholder="Tell us about their connection..."
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }} disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending...' : 'Send Application'}
                    </button>
                </form>
            </div>
        </div>
    );
}
