/**
 * Gallery Section
 * Keith Greenbaum style - staggered masonry with light background
 */

import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Events.module.css';

// Gallery items with varying heights
const GALLERY_ITEMS = [
    // Column 1
    { id: 1, image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80', height: 'tall', index: '01' },
    { id: 5, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', height: 'short', index: '05' },
    { id: 9, image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80', height: 'medium', index: '09' },
    // Column 2
    { id: 2, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80', height: 'medium', index: '02' },
    { id: 6, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80', height: 'tall', index: '06' },
    { id: 10, image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80', height: 'short', index: '10' },
    // Column 3
    { id: 3, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', height: 'tall', index: '03' },
    { id: 7, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', height: 'medium', index: '07' },
    { id: 11, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', height: 'tall', index: '11' },
    // Column 4
    { id: 4, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', height: 'short', index: '04' },
    { id: 8, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80', height: 'medium', index: '08' },
    { id: 12, image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&q=80', height: 'tall', index: '12' },
];

export function Events() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);

            gsap.from(items, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.06,
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
                    <span className={styles.filterLabel}>Gallery</span>
                </header>

                {/* Masonry Grid */}
                <div className={styles.grid}>
                    {GALLERY_ITEMS.map((item) => (
                        <div key={item.id} className={`${styles.item} ${styles[item.height]}`}>
                            <img
                                src={item.image}
                                alt=""
                                className={styles.image}
                                loading="lazy"
                            />
                            <span className={styles.index}>{item.index}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
