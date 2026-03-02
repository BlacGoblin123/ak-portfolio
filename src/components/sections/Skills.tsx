'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const groups = [
    { id: '01', cat: 'Marketing Strategy', accent: '#ff3c00', skills: ['Digital Marketing', 'Campaign Planning', 'Content Strategy', 'Social Media', 'Email Marketing', 'STP Framework'] },
    { id: '02', cat: 'Brand Development', accent: '#f5c842', skills: ['Brand Positioning', 'Visual Identity', 'Brand Guidelines', 'Messaging Architecture', 'Storytelling', 'Competitor Analysis'] },
    { id: '03', cat: 'Business Development', accent: '#7c3aed', skills: ['Market Research', 'Lead Generation', 'B2B Partnerships', 'Sales Strategy', 'Market Entry', 'Stakeholder Mgmt'] },
    { id: '04', cat: 'SEO & Analytics', accent: '#059669', skills: ['Technical SEO', 'Keyword Research', 'Google Analytics 4', 'Performance Tracking', 'A/B Testing', 'Data Analysis'] },
    { id: '05', cat: 'AI & Automation', accent: '#0ea5e9', skills: ['ChatGPT / LLMs', 'Marketing Automation', 'Predictive Analytics', 'AI Content Tools', 'CRM Integration', 'Prompt Engineering'] },
    { id: '06', cat: 'Tools & Platforms', accent: '#f97316', skills: ['Google Ads', 'Meta Ads Manager', 'HubSpot', 'GA4', 'Figma', 'Python (basics)'] },
];

export default function Skills() {
    const secRef = useRef<HTMLElement>(null);
    const groupRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.fromTo(groupRefs.current, { opacity: 0, y: 44 }, {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.72, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="skills" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">Expertise</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem', flexWrap: 'wrap' }}>
                    <h2>SKILLS &amp;<br />TOOLS</h2>
                    <p style={{ maxWidth: '36ch', textAlign: 'right' }}>Six capability domains covering the full marketing-to-revenue stack.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)' }}>
                    {groups.map((g, i) => (
                        <div key={g.id} ref={el => { if (el) groupRefs.current[i] = el; }}
                            style={{ background: 'var(--bg)', padding: '2.2rem 1.8rem', position: 'relative', transition: 'background 0.25s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#ececec')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: g.accent }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.3rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1 }}>{g.cat.toUpperCase()}</h3>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--ink-60)' }}>{g.id}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                {g.skills.map(s => <span key={s} className="tag">{s}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
