'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo(navRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' });
    }, []);

    const scrollTo = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav ref={navRef} className="nav-container" style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 1000,
            padding: '1.4rem clamp(1.5rem,5vw,5rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                AK — Portfolio
            </span>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {[['Work', '#projects'], ['About', '#about'], ['Skills', '#skills'], ['Workshop', '#workshop'], ['Contact', '#contact']].map(([label, id]) => (
                    <button key={id} onClick={() => scrollTo(id)} className="hide-mobile" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em',
                        textTransform: 'uppercase', background: 'none', border: 'none',
                        color: 'var(--ink)', cursor: 'pointer', opacity: 0.65,
                        transition: 'opacity 0.2s', padding: 0,
                    }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
                    >{label}</button>
                ))}
                <a href="https://www.linkedin.com/in/atichat-khanma" target="_blank" rel="noopener noreferrer"
                    className="btn btn-filled hide-mobile" style={{ fontSize: '0.62rem', padding: '0.58rem 1.1rem' }}>
                    LinkedIn ↗
                </a>
            </div>
        </nav>
    );
}
