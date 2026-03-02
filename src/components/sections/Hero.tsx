'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const roles = ['BUSINESS GRADUATE', 'MARKETING STRATEGIST', 'GROWTH OPERATOR', 'BRAND DEVELOPER', 'AI-ERA BUILDER'];

/* ── Marketing framework elements ─────────────────────────────── */
const FRAMEWORKS = [
    /* label, subtitle, col, row, rotation, delay, size */
    { label: '4 P\'s', sub: 'Product · Price · Place · Promotion', x: '62%', y: '12%', rot: -8, delay: 0.4, size: 'lg' },
    { label: 'STP', sub: 'Segment · Target · Position', x: '78%', y: '38%', rot: 5, delay: 0.6, size: 'md' },
    { label: 'TOFU', sub: 'Top of Funnel', x: '58%', y: '54%', rot: -4, delay: 0.8, size: 'sm' },
    { label: 'MOFU', sub: 'Middle of Funnel', x: '72%', y: '64%', rot: 6, delay: 0.9, size: 'sm' },
    { label: 'BOFU', sub: 'Bottom of Funnel', x: '86%', y: '54%', rot: -3, delay: 1.0, size: 'sm' },
    { label: 'BCG', sub: 'Stars · Cash Cows · Dogs · ?', x: '66%', y: '78%', rot: 4, delay: 1.1, size: 'md' },
    { label: 'AIDA', sub: 'Awareness · Interest · Desire · Action', x: '57%', y: '30%', rot: 7, delay: 0.5, size: 'md' },
    { label: 'CAC : LTV', sub: 'Acquisition vs Lifetime Value', x: '82%', y: '20%', rot: -6, delay: 0.7, size: 'sm' },
];

const SIZE_MAP = {
    lg: { fontSize: '2.2rem', padding: '1.1rem 1.6rem', subSize: '0.75rem' },
    md: { fontSize: '1.4rem', padding: '0.85rem 1.25rem', subSize: '0.7rem' },
    sm: { fontSize: '1rem', padding: '0.65rem 1rem', subSize: '0.65rem' },
};

export default function Hero() {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const tagRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const idx = useRef(0);

    /* ── GSAP entrance + cycling role ─────────────────────────────── */
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(nameRef.current,
            { clipPath: 'inset(0 0 100% 0)', y: 40 },
            { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, delay: 0.25 })
            .fromTo(roleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
            .fromTo(tagRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
            .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

        // Animate framework cards in
        const cards = document.querySelectorAll<HTMLElement>('.fw-card');
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.55, delay: 0.5 + i * 0.08, ease: 'power2.out' }
            );
            // Gentle continuous float
            gsap.to(card, {
                y: `+=${6 + (i % 3) * 3}`,
                duration: 2.8 + i * 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.3,
            });
        });

        const cycle = setInterval(() => {
            idx.current = (idx.current + 1) % roles.length;
            gsap.to(roleRef.current, {
                opacity: 0, y: -10, duration: 0.28, onComplete: () => {
                    if (roleRef.current) roleRef.current.textContent = roles[idx.current];
                    gsap.to(roleRef.current, { opacity: 1, y: 0, duration: 0.36 });
                }
            });
        }, 2800);

        /* ── Scroll-driven exit: everything dissolves as user scrolls down ── */
        const section = document.getElementById('hero')!;

        // Name clips upward and shrinks slightly
        gsap.to(nameRef.current, {
            yPercent: -18,
            opacity: 0,
            scale: 0.96,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
        });

        // Role + tag + CTA fade and rise faster
        gsap.to([roleRef.current, tagRef.current, ctaRef.current], {
            yPercent: -30,
            opacity: 0,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: '60% top', scrub: 0.8 },
        });

        // Framework cards scatter: alternate up/down/left/right
        document.querySelectorAll<HTMLElement>('.fw-card').forEach((card, i) => {
            const dir = i % 4;
            gsap.to(card, {
                x: dir === 0 ? -60 : dir === 1 ? 60 : 0,
                y: dir === 2 ? -80 : dir === 3 ? 80 : -40,
                opacity: 0,
                scale: 0.85,
                rotate: (i % 2 === 0 ? 1 : -1) * (4 + i * 2),
                ease: 'none',
                scrollTrigger: {
                    trigger: section, start: 'top top',
                    end: `${40 + i * 8}% top`, scrub: 0.8,
                },
            });
        });

        return () => {
            clearInterval(cycle);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="hero" style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', padding: 'clamp(1.5rem,5vw,5rem)',
            paddingTop: '7rem', paddingBottom: '3.5rem', position: 'relative', overflow: 'hidden',
        }}>

            {/* ── Framework floating elements ────────────────────────────── */}
            <div className="hero-shapes" style={{
                position: 'absolute', top: 0, right: 0,
                width: '55%', height: '100%', pointerEvents: 'none',
            }}>
                {FRAMEWORKS.map((fw) => {
                    const s = SIZE_MAP[fw.size as keyof typeof SIZE_MAP];
                    return (
                        <div
                            key={fw.label}
                            className="fw-card"
                            style={{
                                position: 'absolute',
                                left: fw.x,
                                top: fw.y,
                                transform: `translateX(-50%) rotate(${fw.rot}deg)`,
                                opacity: 0, // GSAP animates to 1
                                border: '1.5px solid var(--ink-20)',
                                background: 'rgba(229,229,229,0.75)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                padding: s.padding,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                                minWidth: '8rem',
                            }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: s.fontSize,
                                lineHeight: 1,
                                letterSpacing: '0.04em',
                                color: 'var(--ink)',
                                whiteSpace: 'nowrap',
                            }}>
                                {fw.label}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: s.subSize,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: 'var(--ink-60)',
                                whiteSpace: 'nowrap',
                            }}>
                                {fw.sub}
                            </span>
                        </div>
                    );
                })}


            </div>

            {/* ── Availability ──────────────────────────────────────────── */}
            <div className="hero-availability" style={{
                position: 'absolute', top: '6.5rem', right: 'clamp(1.5rem,5vw,5rem)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--ink-60)', zIndex: 2,
            }}>
                <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 0 3px rgba(34,197,94,0.25)', animation: 'greenPulse 2s infinite'
                }} />
                Available for opportunities
            </div>

            {/* ── Name ─────────────────────────────────────────────────── */}
            <div className="hero-name" style={{ overflow: 'hidden', marginBottom: '1.2rem', position: 'relative', zIndex: 2 }}>
                <h1 ref={nameRef} style={{ lineHeight: 0.87, letterSpacing: '-0.01em' }}>
                    ATICHAT<br />KHANMA
                </h1>
            </div>

            {/* ── Cycling role ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--ink-60)' }}>01 —</span>
                <span ref={roleRef} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>
                    {roles[0]}
                </span>
            </div>

            {/* ── Tagline + CTAs ───────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                <p ref={tagRef} style={{ maxWidth: '44ch', fontSize: 'clamp(1.2rem,1.8vw,1.45rem)', lineHeight: 1.65, color: 'var(--ink-60)' }}>
                    <span style={{
                        background: 'var(--ink)', color: 'var(--bg)',
                        padding: '0.05em 0.35em', marginRight: '0.25em',
                        fontFamily: 'var(--font-display)', fontSize: '1.1em', letterSpacing: '0.04em',
                    }}>BUSINESS GRADUATE</span>
                    driving growth through strategic brand development, data-driven SEO, and innovative AI solutions. Based in Auckland, NZ.
                </p>
                <div ref={ctaRef} className="hero-ctas" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href="#projects" className="btn btn-filled">View Work ↓</a>
                    <a href="mailto:atichat.khanma2000@gmail.com" className="btn">Email Me</a>
                </div>
            </div>

            {/* ── Expertise strip ───────────────────────────────────────── */}
            <div className="hero-strip" style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                borderTop: '1px solid var(--ink-20)', display: 'flex', overflow: 'hidden', zIndex: 2,
            }}>
                {['Marketing Strategy', 'Brand Strategy', 'Business Dev', 'SEO', 'AI Utilization', 'Digital Marketing'].map((item, i, arr) => (
                    <div key={item} style={{
                        flex: 1, padding: '0.75rem 0.8rem',
                        borderRight: i < arr.length - 1 ? '1px solid var(--ink-20)' : 'none',
                        fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: 'var(--ink-60)', textAlign: 'center', whiteSpace: 'nowrap',
                    }}>{item}</div>
                ))}
            </div>

            <style>{`
                @keyframes greenPulse {
                    0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
                    50% { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
                }
                .fw-card:hover {
                    border-color: var(--ink-60) !important;
                    background: rgba(229,229,229,0.95) !important;
                }
            `}</style>
        </section>
    );
}
