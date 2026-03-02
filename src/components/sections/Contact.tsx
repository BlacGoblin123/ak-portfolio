'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const links = [
    { label: 'Email', value: 'atichat.khanma2000@gmail.com', href: 'mailto:atichat.khanma2000@gmail.com' },
    { label: 'Phone', value: '022 362 3589', href: 'tel:+6422362359' },
    { label: 'LinkedIn', value: 'linkedin.com/in/atichat-khanma', href: 'https://www.linkedin.com/in/atichat-khanma' },
];

const services = ['Marketing Strategy', 'Brand Development', 'SEO & Analytics', 'AI Implementation', 'Business Development'];

export default function Contact() {
    const secRef = useRef<HTMLElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const linkRefs = useRef<HTMLAnchorElement[]>([]);
    const tagsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // h2 clip-path wipe reveal
        gsap.fromTo(h2Ref.current,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out',
                scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
            }
        );

        // Contact links stagger up
        gsap.fromTo(linkRefs.current,
            { opacity: 0, y: 24 },
            {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: secRef.current, start: 'top 65%' },
            }
        );

        // Service tags fade in
        gsap.fromTo(tagsRef.current,
            { opacity: 0, y: 16 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                scrollTrigger: { trigger: secRef.current, start: 'top 55%' },
            }
        );
        // cleanup handled by component unmount
    }, []);

    return (
        <section id="contact" ref={secRef} className="section" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
            <div className="container">
                <div className="section-label" style={{ color: 'rgba(229,229,229,0.5)' }}>Contact</div>
                <h2 ref={h2Ref} style={{ color: 'var(--bg)', marginBottom: '1rem', fontSize: 'clamp(3.5rem,9vw,9rem)' }}>
                    LET&apos;S DRIVE<br />GROWTH
                </h2>
                <p style={{ maxWidth: '40ch', color: 'rgba(229,229,229,0.6)', marginBottom: '4rem', fontSize: '1.05rem' }}>
                    Ready to build something that moves the needle? Let&apos;s talk strategy, brand, or growth.
                </p>

                {/* Contact Links */}
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '3.5rem' }}>
                    {links.map((l, i) => (
                        <a key={i} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            ref={el => { if (el) linkRefs.current[i] = el; }}
                            className="contact-link-row"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 0', borderBottom: '1px solid rgba(229,229,229,0.12)', color: 'var(--bg)', textDecoration: 'none', gap: '1rem', position: 'relative' }}
                            onMouseEnter={e => { const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement; if (arrow) { arrow.style.color = 'var(--accent)'; arrow.style.transform = 'translateX(6px)'; } }}
                            onMouseLeave={e => { const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement; if (arrow) { arrow.style.color = ''; arrow.style.transform = ''; } }}
                        >
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(229,229,229,0.5)', minWidth: '7rem' }}>{l.label}</span>
                            <span className="contact-link-value" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem,2vw,1.35rem)', flex: 1 }}>{l.value}</span>
                            <span className="arrow" style={{ position: 'absolute', right: 0, fontFamily: 'var(--font-mono)', fontSize: '1.1rem', transition: 'color 0.2s, transform 0.2s' }}>→</span>
                        </a>
                    ))}
                </div>

                {/* Service Tags */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(229,229,229,0.4)', marginBottom: '1rem' }}>Services</div>
                    <div ref={tagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {services.map(s => (
                            <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', border: '1px solid rgba(229,229,229,0.2)', color: 'rgba(229,229,229,0.6)' }}>{s}</span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(229,229,229,0.1)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em', opacity: 0.45 }}>ATICHAT KHANMA © 2025</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em', opacity: 0.45 }}>AUCKLAND, NEW ZEALAND</span>
                </div>
            </div>
        </section>
    );
}
