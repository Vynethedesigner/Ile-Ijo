/**
 * Gallery Section
 * Visual showcase of past events and culture with masonry grid
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Gallery.module.css';

// Gallery images - dance/event photos from Unsplash
const GALLERY_ITEMS = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
        title: 'Lagos Night',
        size: 'large', // 2x2
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80',
        title: 'The Movement',
        size: 'medium', // 2x1
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
        title: 'Rhythm & Soul',
        size: 'small', // 1x1
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=400&q=80',
        title: 'Community',
        size: 'small',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
        title: 'Electric Nights',
        size: 'medium',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
        title: 'Unity',
        size: 'small',
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
        title: 'Celebration',
        size: 'small',
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80',
        title: 'Culture',
        size: 'medium',
    },
];

export function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate gallery items on scroll
            const items = gridRef.current?.querySelectorAll(`.${styles.item}`);
            if (!items) return;

            gsap.from(items, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.gallery} id="gallery" ref={sectionRef}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Our Moments</span>
                    <h2 className={styles.title}>Gallery</h2>
                </header>

                {/* Masonry Grid */}
                <div className={styles.grid} ref={gridRef}>
                    {GALLERY_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.item} ${styles[item.size]}`}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className={styles.image}
                                loading="lazy"
                            />
                            <div className={styles.overlay}>
                                <span className={styles.itemTitle}>{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
