'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: '01', title: 'TRADE SPHERE', cat: 'Product Builder · Fintech · AI', accent: '#ff3c00',
        desc: 'Gamified trading education platform built with AI tooling. Live market simulator, gamified ranking system, education hub, community, and an AI financial assistant.',
        metrics: ['+308% Simulated Portfolio Return', 'Gold Trader Rank Achieved', 'Full-stack AI-built App'], url: '#', cta: 'in-dev'
    },
    {
        id: '02', title: 'BAANKAEW THAI MASSAGE', cat: 'Web Build · Google Ads · SEO', accent: '#f5c842',
        desc: 'Built and deployed baankaew.co.nz — a React PWA with GA4. Google Ads: +502% click growth (155→933 clicks/mo), NZD$243 budget, 30K impressions. B2B partnership with Anytime Fitness Feb 2026.',
        metrics: ['+502% Click Growth', '30K Impressions / month', 'NZD $243/month Budget'], url: 'https://baankaew.co.nz', cta: 'link'
    },
    {
        id: '03', title: 'PLAN & POST', cat: 'Startup · Strategy · Product', accent: '#7c3aed',
        desc: 'Marketing agency & creator marketplace concept for NZ small businesses. AI-assisted content planning, scheduling automation, and strategic creator partnerships. Full architecture developed Feb 2026.',
        metrics: ['AI Content Planning System', 'Creator Marketplace Design', 'In Development — 2026'], url: '#', cta: 'in-dev'
    },
    {
        id: '04', title: 'BRAND COLLECTIVE', cat: 'Agency · Brand · Internship', accent: '#059669',
        desc: 'Marketing Coordinator at Brand Collective LTD. Campaign coordination, competitor analysis, influencer management, and daily multi-platform social media across Twitter, Facebook, and Instagram.',
        metrics: ['Multi-Channel Campaign Mgmt', 'Influencer Coordination', 'Market Research & Analysis'], url: '#', cta: 'none'
    },
    {
        id: '05', title: 'UNION EDUCATION', cat: 'Education · Digital Marketing · Thai Market', accent: '#0ea5e9',
        desc: 'Marketing Intern at Union Education & Migration. Managed and grew the Thai-language Facebook page, targeting international students from Thailand. Developed digital campaigns, localised content, and drove enrolment through culturally-specific marketing strategy.',
        metrics: ['Thai Market Targeting', 'Facebook Page Management', 'International Student Campaigns'], url: 'https://www.facebook.com/union.em.thai', cta: 'link'
    },
];


export default function Projects() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!trackRef.current || !wrapRef.current) return;

        // Disable horizontal scroll animation on mobile
        if (window.innerWidth < 768) return;

        const getX = () => trackRef.current!.scrollWidth - window.innerWidth;

        const anim = gsap.to(trackRef.current, {
            x: () => -getX(),
            ease: 'none',
            scrollTrigger: {
                trigger: wrapRef.current,
                start: 'top top',
                end: () => `+=${getX() + 200}`,
                pin: true,
                scrub: 1.2,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
        return () => { anim.scrollTrigger?.kill(); anim.kill(); };
    }, []);

    return (
        <section id="projects" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container" style={{ paddingTop: '4.5rem', paddingBottom: '3rem' }}>
                <div className="section-label">Case Studies</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
                    <h2>SELECTED WORK</h2>
                    <p style={{ maxWidth: '38ch', textAlign: 'right' }}>Five projects spanning fintech, digital marketing, product strategy, agency work, and education — each with measurable results.</p>
                </div>
            </div>

            <div ref={wrapRef} style={{ overflow: 'hidden' }}>
                <div ref={trackRef} className="projects-track" style={{
                    display: 'flex', alignItems: 'stretch', width: 'max-content', height: '100vh',
                    gap: '1px', background: 'var(--ink-20)', paddingLeft: 'clamp(1.5rem,5vw,5rem)',
                }}>
                    {projects.map(p => (
                        <div key={p.id} className="projects-card" style={{
                            width: 'clamp(320px,36vw,500px)', background: 'var(--bg)', padding: '3.5rem 2.5rem',
                            flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            position: 'relative', transition: 'background 0.3s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#ececec')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: p.accent }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.18em', color: 'var(--ink-60)' }}>{p.id}</span>
                                <span className="tag">{p.cat}</span>
                            </div>

                            <div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3.2rem)', lineHeight: 0.92, marginBottom: '1.4rem', marginTop: '2rem' }}>{p.title}</h3>
                                <p style={{ fontSize: '1.02rem', lineHeight: 1.67 }}>{p.desc}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '2rem' }}>
                                {p.metrics.map(m => (
                                    <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.07em' }}>
                                        <span style={{ color: p.accent, fontSize: '0.45rem' }}>◆</span>{m}
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '2.5rem' }}>
                                {p.cta === 'link' && (
                                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.85rem' }}>View Project ↗</a>
                                )}
                                {p.cta === 'in-dev' && (
                                    <span style={{
                                        display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                                        letterSpacing: '0.12em', textTransform: 'uppercase',
                                        padding: '0.45rem 0.9rem', border: `1.5px solid ${p.accent}`,
                                        color: p.accent,
                                    }}>In Development</span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div style={{ width: 'clamp(1.5rem,5vw,5rem)', flexShrink: 0 }} />
                </div>
            </div>
        </section>
    );
}
