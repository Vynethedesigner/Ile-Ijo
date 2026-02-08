/**
 * Gallery Section
 * Keith Greenbaum style - staggered masonry with light background
 */

import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Events.module.css';

// Gallery items with varying heights - Ile Ijo event photos
const GALLERY_ITEMS = [
    // Column 1
    { id: 1, image: '/Gallery/DSC_9805.jpg', height: 'tall', index: '01' },
    { id: 5, image: '/Gallery/DSC_5337.jpg', height: 'short', index: '05' },
    { id: 9, image: '/Gallery/DSC_6323.jpg', height: 'medium', index: '09' },
    // Column 2
    { id: 2, image: '/Gallery/DSC_1622.jpg', height: 'medium', index: '02' },
    { id: 6, image: '/Gallery/DSC_1387.jpg', height: 'tall', index: '06' },
    { id: 10, image: '/Gallery/DSC_6344.jpg', height: 'short', index: '10' },
    // Column 3
    { id: 3, image: '/Gallery/DSC_0673.jpg', height: 'tall', index: '03' },
    { id: 7, image: '/Gallery/DSC_5512.jpg', height: 'medium', index: '07' },
    { id: 11, image: '/Gallery/DSC_1575.jpg', height: 'tall', index: '11' },
    // Column 4
    { id: 4, image: '/Gallery/DSC_6414.jpg', height: 'short', index: '04' },
    { id: 8, image: '/Gallery/DSC_6435.jpg', height: 'medium', index: '08' },
    { id: 12, image: '/Gallery/DSC_1742.jpg', height: 'tall', index: '12' },
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
