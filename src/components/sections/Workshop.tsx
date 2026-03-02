'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RegisterForm from '../RegisterForm';
gsap.registerPlugin(ScrollTrigger);

const curriculum = [
    {
        day: 'Day 01',
        title: 'Business Foundations & Brand',
        hours: '2 Hours',
        date: 'Session 1',
        accent: '#ff3c00',
        modules: [
            {
                time: '0:00 – 1:00',
                title: 'Business Fundamentals',
                topics: [
                    'How to identify a business idea and validate it',
                    'Business models — product, service, subscription, marketplace',
                    'Understanding your customer — market research basics',
                    'STP Framework: Segmentation, Targeting, Positioning',
                    'Reading financial basics: revenue, profit, cost structure',
                ],
            },
            {
                time: '1:00 – 2:00',
                title: 'Brand Strategy & Identity',
                topics: [
                    'What is a brand and why it matters',
                    'Defining your brand voice, values, and positioning',
                    'Creating a simple visual identity (logo, colours, typography)',
                    'Brand consistency across platforms',
                    'Real examples: NZ business brand transformations',
                ],
            },
        ],
    },
    {
        day: 'Day 02',
        title: 'Digital Marketing & AI Growth',
        hours: '2 Hours',
        date: 'Session 2',
        accent: '#0ea5e9',
        modules: [
            {
                time: '0:00 – 1:00',
                title: 'Digital Marketing & SEO',
                topics: [
                    'Google Ads fundamentals — how to run your first campaign',
                    'SEO basics: keyword research, on-page optimisation',
                    'Social media strategy: what platforms, what content',
                    'Email marketing: building a list and writing campaigns',
                    'Reading Google Analytics — what numbers actually matter',
                ],
            },
            {
                time: '1:00 – 2:00',
                title: 'AI Tools for Business Growth',
                topics: [
                    'How to use ChatGPT and LLMs to save 10+ hours/week',
                    'AI-assisted content creation, copywriting, and scheduling',
                    'Automating repetitive marketing tasks with free tools',
                    'CRM basics and customer data management',
                    'Building your 30-day growth action plan',
                ],
            },
        ],
    },
];

const audience = [
    { label: 'Aspiring Business Students', icon: '🎓', desc: 'Pre-enrolled or considering a business degree — learn what the syllabus won\'t tell you in year one.' },
    { label: 'Small Business Owners', icon: '🏪', desc: 'Running a business but unclear on marketing, brand, or digital strategy. Practical toolkits, real examples.' },
    { label: 'Career Changers', icon: '🔄', desc: 'Transitioning into business or marketing roles and need a rapid foundation to get job-ready fast.' },
    { label: 'Entrepreneurs & Side Hustlers', icon: '🚀', desc: 'Starting something and need to understand brand, growth, and AI tools to launch with confidence.' },
];

export default function Workshop() {
    const secRef = useRef<HTMLElement>(null);
    const dayRefs = useRef<HTMLDivElement[]>([]);
    const audRefs = useRef<HTMLDivElement[]>([]);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(dayRefs.current, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, stagger: 0.15, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 70%' },
        });
        gsap.fromTo(audRefs.current, { opacity: 0, x: -30 }, {
            opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 55%' },
        });
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="workshop" ref={secRef} className="section" style={{ borderTop: '1px solid var(--ink-20)' }}>
            <div className="container">
                <div className="section-label">Workshop</div>

                {/* Header */}
                <div className="workshop-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,6rem)', marginBottom: '4rem', alignItems: 'end' }}>
                    <h2 style={{ wordBreak: 'break-word', hyphens: 'auto' }}>BUSINESS<br />ACCELERATOR<br />WORKSHOP</h2>
                    <div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            {['2 Days', '2 Hrs / Session', 'Hands-On', 'Auckland, NZ'].map(tag => (
                                <span key={tag} className="tag" style={{ borderColor: 'var(--ink-60)', color: 'var(--ink)' }}>{tag}</span>
                            ))}
                        </div>
                        <p>A practical, no-fluff workshop series designed for people ready to build, grow, or launch a business. From fundamentals to AI-powered growth — delivered in two focused 2-hour sessions.</p>
                        <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => setFormOpen(true)} className="btn btn-filled">Register Interest</button>
                            <a href="mailto:atichat.khanma2000@gmail.com" className="btn">Contact Me</a>
                        </div>
                    </div>
                </div>

                {/* Audience */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: '1.5rem' }}>Who This Is For</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)' }}>
                        {audience.map((a, i) => (
                            <div key={i} ref={el => { if (el) audRefs.current[i] = el; }}
                                style={{ background: 'var(--bg)', padding: '1.8rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <span style={{ fontSize: '1.8rem' }}>{a.icon}</span>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>{a.label}</div>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Curriculum */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: '1.5rem' }}>Curriculum</div>
                <div className="curriculum-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '1px', background: 'var(--ink-20)', border: '1px solid var(--ink-20)', marginBottom: '3rem' }}>
                    {curriculum.map((day, di) => (
                        <div key={di} ref={el => { if (el) dayRefs.current[di] = el; }}
                            style={{ background: 'var(--bg)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: day.accent }} />
                            <div style={{ padding: '2rem 2rem 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: day.accent, fontWeight: 700 }}>{day.day}</span>
                                    <span className="tag">{day.hours}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', lineHeight: 1, marginBottom: '2rem' }}>{day.title.toUpperCase()}</h3>
                            </div>
                            {day.modules.map((mod, mi) => (
                                <div key={mi} style={{ borderTop: '1px solid var(--ink-20)', padding: '1.6rem 2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1 }}>{mod.title.toUpperCase()}</div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--ink-60)', whiteSpace: 'nowrap' }}>{mod.time}</span>
                                    </div>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {mod.topics.map((t, ti) => (
                                            <li key={ti} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--ink-60)' }}>
                                                <span style={{ color: day.accent, fontSize: '0.5rem', marginTop: '0.45em', flexShrink: 0 }}>◆</span>{t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* CTA Bar */}
                <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '2.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1, marginBottom: '0.4rem' }}>INTERESTED IN JOINING?</div>
                        <p style={{ color: 'rgba(229,229,229,0.6)', margin: 0, fontSize: '1rem' }}>Register your interest — workshops run based on demand.</p>
                    </div>
                    <button
                        onClick={() => setFormOpen(true)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 2rem', border: '2px solid var(--bg)', color: 'var(--bg)', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.25s, color 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--ink)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bg)'; }}
                    >
                        Register Interest →
                    </button>
                </div>
            </div>

            <RegisterForm open={formOpen} onClose={() => setFormOpen(false)} />
        </section>
    );
}
