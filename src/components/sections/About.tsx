'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const highlights = [
    { stat: 'BCom', label: 'Marketing Degree', detail: 'Unitec Auckland — graduating 2025, ceremony April 2026' },
    { stat: '4×', label: 'Certifications', detail: 'Google DM, Google Ads, Project Mgmt, HubSpot' },
    { stat: '+502%', label: 'Click Growth', detail: 'Baankaew Google Ads — $243/mo, 30K impressions' },
    { stat: '6 YRS', label: 'Business Ownership', detail: 'Nine Thai Cuisine, Auckland' },
];

export default function About() {
    const secRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Clip-path wipe reveal on h2
        gsap.fromTo(h2Ref.current,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
            }
        );
        // Left text block slides in
        gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        });
        gsap.fromTo(cardRefs.current, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 65%' },
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="about" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">About</div>
                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,8rem)', alignItems: 'start' }}>

                    {/* Left */}
                    <div ref={leftRef}>
                        <h2 ref={h2Ref} style={{ marginBottom: '2.5rem' }}>MARKETING<br />MIND,<br />BUSINESS<br />DRIVE</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                            <p style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>Before marketing theory, there was real business. I owned and operated <strong style={{ color: 'var(--ink)' }}>Nine Thai Cuisine</strong> for{' '}
                                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>six years</span> — managing staffing, suppliers, brand identity, and customer growth. That entrepreneurial foundation shapes every campaign I run.</p>
                            <p style={{ fontSize: '1.05rem' }}>I hold a{' '}
                                <span style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '0.05em 0.35em', fontFamily: 'var(--font-display)', fontSize: '1.05em', letterSpacing: '0.04em' }}>BCom MARKETING</span>{' '}
                                from Unitec Auckland, backed by four professional certifications across Google and HubSpot. At Baankaew I drove{' '}
                                <strong style={{ color: 'var(--accent)', fontSize: '1.1em' }}>+502% click growth</strong> on a $243/month budget — 30,000 monthly impressions, B2B partnership with Anytime Fitness.</p>
                            <p style={{ fontSize: '1.05rem' }}>Multilingual across English, Thai, and Lao. Leadership roles include VP of the Unitec Muay Thai Club, PASS Leader for marketing students, two-time Student Representative, and Football Team Manager for a 20-player squad.</p>
                        </div>
                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <a href="mailto:atichat.khanma2000@gmail.com" className="btn btn-filled">Get in Touch</a>
                            <a href="https://linkedin.com/in/atichat-khanma" target="_blank" rel="noopener noreferrer" className="btn">LinkedIn ↗</a>
                        </div>
                    </div>

                    {/* Right */}
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)' }}>
                            {highlights.map((h, i) => (
                                <div key={i} ref={el => { if (el) cardRefs.current[i] = el; }}
                                    style={{ background: 'var(--bg)', padding: '2rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', cursor: 'default', transition: 'background 0.25s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.querySelectorAll<HTMLElement>('*').forEach(el => el.style.color = 'var(--bg)'); }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.querySelectorAll<HTMLElement>('*').forEach(el => el.style.color = ''); }}
                                >
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 1 }}>{h.stat}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{h.label}</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.5, marginTop: '0.2rem' }}>{h.detail}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '1.1rem 1.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.14em' }}>📍 AUCKLAND, NEW ZEALAND</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.65 }}>022 362 3589</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
