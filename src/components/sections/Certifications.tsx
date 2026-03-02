'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const certs = [
    { name: 'Google Digital Marketing & E-commerce', issuer: 'Coursera / Google', date: 'Feb 2024', accent: '#4285F4' },
    { name: 'Google Project Management', issuer: 'Coursera / Google', date: 'Feb 2024', accent: '#34A853' },
    { name: 'HubSpot Professional Digital Marketing', issuer: 'HubSpot Academy', date: '2024', accent: '#FF7A59' },
    { name: 'Google Ad Search Certificate', issuer: 'Google', date: '2025', accent: '#FBBC04' },
];

export default function Certifications() {
    const secRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.fromTo(cardRefs.current, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.72, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="certifications" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">Credentials</div>
                <h2 style={{ marginBottom: '3.5rem' }}>CERTIFIED &amp;<br />VERIFIED</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)' }}>
                    {certs.map((c, i) => (
                        <div key={i} ref={el => { if (el) cardRefs.current[i] = el; }}
                            style={{ background: 'var(--bg)', padding: '2.2rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: c.accent }} />
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-60)' }}>{c.issuer}</div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1.05, letterSpacing: '0.02em' }}>{c.name.toUpperCase()}</h3>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: c.accent }}>{c.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
