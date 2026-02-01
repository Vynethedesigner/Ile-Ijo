import { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Footer.module.css';

// Declare UnicornStudio on window for TypeScript
declare global {
    interface Window {
        UnicornStudio?: {
            isInitialized?: boolean;
            init: () => void;
        };
    }
}

export function Footer() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const webglRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);

    // Initialize logic for spacer
    useLayoutEffect(() => {
        if (!footerRef.current) return;

        // Create spacer if using portal or just use ref if in-tree
        // Here we assume a spacer div is rendered before the footer.

        const updateHeight = () => {
            if (footerRef.current && spacerRef.current) {
                const height = footerRef.current.offsetHeight;
                spacerRef.current.style.height = `${height}px`;
            }
        };

        const observer = new ResizeObserver(updateHeight);
        observer.observe(footerRef.current);
        updateHeight(); // Initial check

        return () => observer.disconnect();
    }, []);

    // Load Unicorn Studio script
    useEffect(() => {
        const loadUnicornStudio = () => {
            const u = window.UnicornStudio;
            if (u && u.init) {
                u.init();
            } else {
                window.UnicornStudio = { isInitialized: false, init: () => { } };
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.4/dist/unicornStudio.umd.js';
                script.onload = () => {
                    window.UnicornStudio?.init();
                };
                document.head.appendChild(script);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadUnicornStudio);
        } else {
            loadUnicornStudio();
        }

        // Remove Unicorn Studio badge
        const removeBadge = () => {
            if (webglRef.current) {
                const badges = webglRef.current.querySelectorAll('a[href*="unicorn.studio"]');
                badges.forEach(badge => badge.remove());
            }
            const globalBadges = document.querySelectorAll('a[href*="unicorn.studio"]');
            globalBadges.forEach(badge => badge.remove());
        };

        const observer = new MutationObserver(() => {
            removeBadge();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        const intervalId = setInterval(removeBadge, 500);
        const cleanupTimeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 10000);

        return () => {
            document.removeEventListener('DOMContentLoaded', loadUnicornStudio);
            observer.disconnect();
            clearInterval(intervalId);
            clearTimeout(cleanupTimeoutId);
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 0px)", () => {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    ease: "none",
                    duration: 20,
                    repeat: -1,
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Spacer to push content up so footer can be revealed */}
            <div ref={spacerRef} style={{ width: '100%', position: 'relative', zIndex: 1, backgroundColor: 'transparent', pointerEvents: 'none' }} />

            <footer className={styles.footer} ref={footerRef}>
                {/* WebGL overlay - centered, max 1920px wide */}
                <div className={styles.webglBackground}>
                    <div
                        ref={webglRef}
                        data-us-project="iMcdX5PHFolnrGMe4k3j"
                        className={styles.webglEmbed}
                    />
                </div>

                <div className={styles.container}>
                    {/* Top Row */}
                    <div className={styles.topRow}>
                        <div className={styles.column}>
                            <span className={styles.label}>
                                Fill the form to get into<br />
                                exclusive house parties.
                            </span>
                        </div>

                        <div className={`${styles.column} ${styles.center}`}>
                            <img src="/logo.svg" alt="Ile Ijo" className={styles.logo} />
                        </div>

                        <div className={`${styles.column} ${styles.right}`}>
                            <span className={styles.label}>Get In Touch</span>
                            <a href="mailto:hello@ileijo.com" className={styles.link}>
                                HELLO@ILEIJO.COM
                            </a>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className={styles.bottomRow}>
                        <span>©2026 ILEIJO.LIFE® ALL RIGHTS RESERVED</span>

                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink}>FACEBOOK</a>
                            <a href="#" className={styles.socialLink}>FOUNDER</a>
                            <a href="#" className={styles.socialLink}>INSTAGRAM</a>
                        </div>

                        <span>CRAFTED IN LAGOS BY ANTIGRAVITY</span>
                    </div>
                </div>

                {/* Huge Marquee - Duplicated for seamless loop */}
                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeWrapper} ref={marqueeRef}>
                        <span className={styles.marqueeItem}>THE RHYTHM STARTS HERE —&nbsp;</span>
                        <span className={styles.marqueeItem}>THE RHYTHM STARTS HERE —&nbsp;</span>
                        <span className={styles.marqueeItem}>THE RHYTHM STARTS HERE —&nbsp;</span>
                        <span className={styles.marqueeItem}>THE RHYTHM STARTS HERE —&nbsp;</span>
                    </div>
                </div>
            </footer>
        </>
    );
}
