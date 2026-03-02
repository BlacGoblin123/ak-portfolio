'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RegisterFormProps {
    open: boolean;
    onClose: () => void;
}

export default function RegisterForm({ open, onClose }: RegisterFormProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // ── GSAP Slide Animation ──────────────────────────────────────────────
    useEffect(() => {
        if (!overlayRef.current || !panelRef.current) return;

        if (open) {
            // Reset state when opening
            setStatus('idle');
            // Show overlay & animate in
            gsap.set(overlayRef.current, { display: 'block' });
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(panelRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });

            // Lock body scroll
            document.body.style.overflow = 'hidden';

            // Add ESC listener
            const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
            window.addEventListener('keydown', onKeyDown);
            return () => window.removeEventListener('keydown', onKeyDown);
        } else {
            // Animate out
            gsap.to(overlayRef.current, {
                opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
                    if (overlayRef.current) overlayRef.current.style.display = 'none';
                }
            });
            gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });

            // Restore scroll
            document.body.style.overflow = '';
        }
    }, [open, onClose]);

    // ── Submit Handler ──────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            goals: formData.get('goals'),
        };

        try {
            const res = await fetch('/api/workshop-register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                // Auto close after 3 seconds
                setTimeout(() => onClose(), 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div
            ref={overlayRef}
            className="register-overlay"
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(26,26,26,0.6)',
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                zIndex: 999, display: 'none', opacity: 0
            }}
            onClick={(e) => {
                // Close if clicking the backdrop, but not the panel itself
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div
                ref={panelRef}
                className="register-panel"
                style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0,
                    width: '100%', maxWidth: '520px',
                    background: 'var(--bg)',
                    borderLeft: '1px solid var(--ink-20)',
                    padding: 'clamp(2rem, 5vw, 4rem)',
                    display: 'flex', flexDirection: 'column',
                    transform: 'translateX(100%)', // Start hidden off-screen
                    overflowY: 'auto'
                }}
            >
                {/* ── Header ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div>
                        <div className="section-label" style={{ marginBottom: '1rem' }}>Application</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>REGISTER<br />INTEREST</h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent', border: 'none', fontSize: '2rem',
                            lineHeight: 1, cursor: 'pointer', color: 'var(--ink)',
                            padding: '0.5rem', margin: '-0.5rem'
                        }}
                        aria-label="Close form"
                    >
                        ×
                    </button>
                </div>

                {/* ── Success State ── */}
                {status === 'success' ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>REQUEST RECEIVED</h3>
                        <p style={{ color: 'var(--ink-60)', fontSize: '1.1rem', maxWidth: '30ch' }}>Thank you. I&apos;ll be in touch shortly with dates for the next available workshop.</p>
                        <button className="btn" onClick={onClose} style={{ marginTop: '2rem' }}>Close Window</button>
                    </div>
                ) : (
                    /* ── Form ── */
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="name" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Name *</label>
                            <input type="text" id="name" name="name" required disabled={status === 'loading'}
                                style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--ink)', padding: '0.75rem 0', fontSize: '1.2rem', fontFamily: 'var(--font-body)', color: 'var(--ink)', outline: 'none', borderRadius: 0 }}
                                placeholder="Your name"
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="email" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email Address *</label>
                            <input type="email" id="email" name="email" required disabled={status === 'loading'}
                                style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--ink-20)', padding: '0.75rem 0', fontSize: '1.2rem', fontFamily: 'var(--font-body)', color: 'var(--ink)', outline: 'none', borderRadius: 0, transition: 'border-color 0.3s' }}
                                placeholder="hello@example.com"
                                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                                onBlur={e => { if (!e.target.value) e.target.style.borderColor = 'var(--ink-20)' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="mobile" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mobile Number</label>
                            <input type="tel" id="mobile" name="mobile" disabled={status === 'loading'}
                                style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--ink-20)', padding: '0.75rem 0', fontSize: '1.2rem', fontFamily: 'var(--font-body)', color: 'var(--ink)', outline: 'none', borderRadius: 0, transition: 'border-color 0.3s' }}
                                placeholder="e.g. 021 123 4567"
                                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                                onBlur={e => { if (!e.target.value) e.target.style.borderColor = 'var(--ink-20)' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                            <label htmlFor="goals" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>What do you want to gain?</label>
                            <textarea id="goals" name="goals" rows={3} disabled={status === 'loading'}
                                style={{ background: 'transparent', border: '1px solid var(--ink-20)', padding: '1rem', fontSize: '1rem', fontFamily: 'var(--font-body)', color: 'var(--ink)', outline: 'none', resize: 'vertical', borderRadius: 0, transition: 'border-color 0.3s', minHeight: '120px' }}
                                placeholder="E.g. I want to learn how to set up Google Ads for my business..."
                                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                                onBlur={e => { if (!e.target.value) e.target.style.borderColor = 'var(--ink-20)' }}
                            />
                        </div>

                        {status === 'error' && (
                            <div style={{ color: '#ef4444', fontSize: '0.9rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca' }}>
                                Something went wrong. Please try again or email me directly.
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-filled"
                            disabled={status === 'loading'}
                            style={{
                                marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center',
                                padding: '1.2rem', fontSize: '1.1rem', opacity: status === 'loading' ? 0.7 : 1
                            }}
                        >
                            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
