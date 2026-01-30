/**
 * Announcement Section
 * Highlights upcoming events with a bold, high-contrast design
 */

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import styles from './Announcement.module.css';

const ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'Spring Celebration',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
        location: 'The Grand Hall Lagos',
        type: 'Private Event',
        index: '(01)',
        isNew: true,
    },
    {
        id: 2,
        title: 'Movement Workshop',
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80',
        location: 'Dance Studio London',
        type: 'Workshop',
        index: '(02)',
        isNew: true,
    },
    {
        id: 3,
        title: 'Cultural Exchange',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
        location: 'Art Center New York',
        type: 'Community',
        index: '(03)',
        isNew: false,
    },
    {
        id: 4,
        title: 'Rhythm & Soul',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
        location: 'Underground Berlin',
        type: 'Nightlife',
        index: '(04)',
        isNew: false,
    },
    {
        id: 5,
        title: 'Afro-House Night',
        image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
        location: 'The Warehouse',
        type: 'Club Event',
        index: '(05)',
        isNew: true,
    },
    {
        id: 6,
        title: 'Community Jam',
        image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80',
        location: 'Open Space London',
        type: 'Free Session',
        index: '(06)',
        isNew: false,
    },
];

export function Announcement() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Title
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Animate Grid Items
            const items = gridRef.current?.children;
            if (items) {
                gsap.from(items, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.announcement} ref={sectionRef}>
            <div className={styles.container}>
                <h2 className={styles.headerTitle} ref={titleRef}>ANNOUNCEMENTS</h2>

                <div className={styles.grid} ref={gridRef}>
                    {ANNOUNCEMENTS.map((item) => (
                        <article key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                            </div>

                            <div className={styles.content}>
                                {/* Row 1: Title + New Badge */}
                                <div className={styles.row}>
                                    <div className={styles.titleWrapper}>
                                        <h3 className={styles.title}>{item.title}</h3>
                                        {item.isNew && <span className={styles.badge}>NEW</span>}
                                    </div>
                                    <span className={styles.metaRight}>{item.type} &nbsp; {item.index}</span>
                                </div>

                                {/* Row 2: Location */}
                                <div className={styles.row}>
                                    <span className={styles.meta}>{item.location}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
