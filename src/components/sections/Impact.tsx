'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 502, prefix: '+', suffix: '%', label: 'Click Growth', ctx: 'Google Ads — Baankaew Thai Massage' },
    { value: 30, prefix: '', suffix: 'K+', label: 'Impressions', ctx: 'Last 30 days, NZD$243 ad spend' },
    { value: 6, prefix: '', suffix: ' YRS', label: 'Business Ownership', ctx: 'Nine Thai Cuisine, Auckland' },
    { value: 75, prefix: '+', suffix: '%', label: 'Organic Traffic', ctx: 'Wandee Thai SEO campaign' },
    { value: 50, prefix: '+', suffix: '%', label: 'Online Sales Lift', ctx: 'Email campaign — Baankaew' },
    { value: 150, prefix: '', suffix: '%', label: 'Avg. ROI', ctx: 'Across campaigns managed' },
];

export default function Impact() {
    const secRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const numRefs = useRef<HTMLSpanElement[]>([]);
    const h2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // h2 clip-path wipe reveal
        gsap.fromTo(h2Ref.current,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out',
                scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
            }
        );
        gsap.fromTo(cardRefs.current, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, stagger: 0.09, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        });
        numRefs.current.forEach((el, i) => {
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
                val: stats[i].value, duration: 1.8, ease: 'power2.out',
                scrollTrigger: { trigger: cardRefs.current[i], start: 'top 82%' },
                onUpdate() { el.textContent = stats[i].prefix + Math.round(obj.val).toString(); },
            });
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="impact" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">Proof of Impact</div>
                <h2 ref={h2Ref} style={{ marginBottom: '3.5rem' }}>REAL RESULTS,<br />REAL DATA</h2>
                <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)' }}>
                    {stats.map((s, i) => (
                        <div key={i} ref={el => { if (el) cardRefs.current[i] = el; }}
                            style={{ background: 'var(--bg)', padding: '2.2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', cursor: 'default', transition: 'background 0.25s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.querySelectorAll<HTMLElement>('*').forEach(el => el.style.color = 'var(--bg)'); }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.querySelectorAll<HTMLElement>('*').forEach(el => el.style.color = ''); }}
                        >
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,6vw,6rem)', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: '0.08em' }}>
                                <span ref={el => { if (el) numRefs.current[i] = el; }}>{s.prefix}0</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '55%', letterSpacing: '0.05em' }}>{s.suffix}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{s.label}</div>
                            <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>{s.ctx}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
