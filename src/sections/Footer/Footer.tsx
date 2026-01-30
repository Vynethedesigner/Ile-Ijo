import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Footer.module.css';

export function Footer() {
    const marqueeRef = useRef<HTMLDivElement>(null);

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
