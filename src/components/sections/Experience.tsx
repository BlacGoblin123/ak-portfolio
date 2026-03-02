'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const roles = [
    { period: 'Jul–Oct 2025', title: 'Marketing Intern', company: 'Union Education & Migration', desc: 'Digital marketing strategy, campaign management, and content creation for prospective students.' },
    { period: 'Mar–May 2025', title: 'Marketing Coordinator', company: 'Brand Collective LTD', desc: 'Agency campaign coordination, competitor analysis, influencer management, daily multi-platform social media.' },
    { period: 'Feb–Nov 2025', title: 'PASS Leader', company: 'Unitec Auckland', desc: 'Peer-assisted study sessions for marketing students. Academic support and mentoring leadership.' },
    { period: 'Jun 2018–Aug 2021', title: 'Digital Marketing Specialist', company: 'Baankaew Thai Massage', desc: 'SEO strategy, social media management, digital campaigns. +75% organic traffic growth, B2B outreach.' },
    { period: 'Dec 2019–Aug 2022', title: 'Marketing Coordinator', company: 'Wandee Thai Massage & Spa', desc: 'Full marketing coordination, brand management, customer acquisition strategy, and market positioning.' },
];

export default function Experience() {
    const secRef = useRef<HTMLElement>(null);
    const rowRefs = useRef<HTMLDivElement[]>([]);
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
        gsap.fromTo(rowRefs.current, { opacity: 0, x: 40 }, {
            opacity: 1, x: 0, stagger: 0.12, duration: 0.78, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="experience" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">Experience</div>
                <h2 ref={h2Ref} style={{ marginBottom: '3.5rem' }}>CAREER<br />TIMELINE</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {roles.map((r, i) => (
                        <div key={i} ref={el => { if (el) rowRefs.current[i] = el; }}
                            className="exp-row" style={{ display: 'grid', gridTemplateColumns: '200px 1px 1fr', gap: '0 2rem', paddingBottom: '2.5rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--ink-20)' }}>
                            <div className="exp-period" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--ink-60)', paddingTop: '0.25rem', lineHeight: 1.5 }}>
                                {r.period}
                            </div>
                            <div className="exp-divider" style={{ background: 'var(--ink-20)', width: 1 }} />
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3vw,2.6rem)', lineHeight: 1, marginBottom: '0.4rem' }}>{r.title.toUpperCase()}</h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>{r.company}</div>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65 }}>{r.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
