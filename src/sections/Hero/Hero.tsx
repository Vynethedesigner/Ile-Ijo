/**
 * Hero Section
 * Full-viewport hero with video/image background,
 * minimal nav, centered CTA, and large brand name at bottom
 */

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap, SplitText } from '../../utils/gsap';
import styles from './Hero.module.css';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const brandRef = useRef<HTMLHeadingElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const posterRef = useRef<HTMLImageElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useLayoutEffect(() => {
        // Wait for fonts to load before splitting text
        document.fonts.ready.then(() => {
            const ctx = gsap.context(() => {
                // Make elements visible (they start hidden to prevent flash)
                gsap.set([taglineRef.current, brandRef.current], { opacity: 1 });

                // SplitText with mask for tagline
                SplitText.create(taglineRef.current, {
                    type: 'words,lines',
                    linesClass: 'line',
                    mask: 'lines',
                    onSplit: (self: { lines: Element[] }) => {
                        gsap.from(self.lines, {
                            duration: 1.5, // Slowed down from 0.8
                            yPercent: 100,
                            opacity: 0,
                            stagger: 0.15, // Slightly increased stagger
                            ease: 'expo.out',
                            delay: 0.3,
                        });
                    },
                });

                // SplitText with mask for brand name
                SplitText.create(brandRef.current, {
                    type: 'chars',
                    mask: 'chars',
                    onSplit: (self: { chars: Element[] }) => {
                        gsap.from(self.chars, {
                            duration: 2, // Slowed down from 1
                            yPercent: 100,
                            opacity: 0,
                            stagger: 0.05, // Increased stagger
                            ease: 'expo.out',
                            delay: 0.8,
                        });
                    },
                });
            }, containerRef);

            return () => ctx.revert();
        });
    }, []);

    // Force video playback - handles browser autoplay restrictions
    useEffect(() => {
        const video = videoRef.current;
        const poster = posterRef.current;
        if (!video) return;

        const playVideo = () => {
            video.play().catch(() => {
                // Autoplay was prevented, try again on user interaction
            });
        };

        // Fade out poster when video starts playing
        const handlePlaying = () => {
            if (!videoLoaded && poster) {
                setVideoLoaded(true);
                gsap.to(poster, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => {
                        poster.style.display = 'none';
                    }
                });
            }
        };

        // Play on load
        playVideo();

        // Resume if paused unexpectedly (e.g., tab switching, buffering)
        const handlePause = () => {
            // Small delay to avoid rapid pause/play cycles
            setTimeout(playVideo, 100);
        };

        video.addEventListener('pause', handlePause);
        video.addEventListener('playing', handlePlaying);

        return () => {
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('playing', handlePlaying);
        };
    }, [videoLoaded]);

    return (
        <section className={styles.hero} id="hero" ref={containerRef}>
            {/* Background Media */}
            <div className={styles.background}>
                {/* Fallback poster image - shown while video loads */}
                <img
                    ref={posterRef}
                    src="/hero-poster.jpg"
                    alt=""
                    className={styles.backgroundMedia}
                    style={{ position: 'absolute', zIndex: 1 }}
                />
                <video
                    ref={videoRef}
                    className={styles.backgroundMedia}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{ position: 'relative', zIndex: 0 }}
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className={styles.backgroundOverlay} />
            </div>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/logo.svg" alt="Ilé Ijo" className={styles.logoImage} />
                </div>
                <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Get in Touch</span>
                    <a href="mailto:ileijong@gmail.com" className={styles.contactEmail}>Ileijong@gmail.com</a>
                </div>
            </header>

            {/* Centered Tagline */}
            <div className={styles.content}>
                <p className={styles.tagline} ref={taglineRef}>
                    A cultural experience celebrating movement, rhythm, and community.
                </p>
            </div>

            {/* Large Brand Name at Bottom */}
            <div className={styles.brandName}>
                <h1 className={styles.brandText} ref={brandRef}>
                    Ilé Ijo
                </h1>
            </div>
        </section>
    );
}
