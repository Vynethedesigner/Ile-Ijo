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
            // Check in the webgl container
            if (webglRef.current) {
                const badges = webglRef.current.querySelectorAll('a[href*="unicorn.studio"]');
                badges.forEach(badge => badge.remove());
            }
            // Also check globally in case badge is added elsewhere
            const globalBadges = document.querySelectorAll('a[href*="unicorn.studio"]');
            globalBadges.forEach(badge => badge.remove());
        };

        // Watch for badge being added to the document
        const observer = new MutationObserver(() => {
            removeBadge();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Also run on interval for extra reliability (badge appears after a delay)
        const intervalId = setInterval(removeBadge, 500);

        // Stop interval after 10 seconds
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
            // Infinite Marquee Animation
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
        <footer className={styles.footer}>
            {/* Unicorn Studio WebGL Background */}
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

            {/* Huge Marquee */}
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeText} ref={marqueeRef}>
                    THE RHYTHM STARTS HERE — THE RHYTHM STARTS HERE —
                </div>
            </div>
        </footer>
    );
}
