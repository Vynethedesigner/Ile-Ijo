/**
 * Announcement Section
 * Highlights upcoming events with a bold, high-contrast design
 * Fetches data from Sanity CMS with fallback to static data
 */

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { sanityClient, urlFor, ANNOUNCEMENTS_QUERY } from '../../lib/sanity';
import type { SanityAnnouncement } from '../../lib/sanity';
import styles from './Announcement.module.css';

// Fallback static data (used while Sanity loads or if fetch fails)
const FALLBACK_ANNOUNCEMENTS = [
    {
        _id: 'fallback-1',
        title: 'Spring Celebration',
        image: '/Gallery/DSC_0512.jpg',
        location: 'The Grand Hall Lagos',
        eventType: 'Private Event',
        isNew: true,
        order: 1,
    },
    {
        _id: 'fallback-2',
        title: 'Movement Workshop',
        image: '/Gallery/DSC_0559.jpg',
        location: 'Dance Studio London',
        eventType: 'Workshop',
        isNew: true,
        order: 2,
    },
    {
        _id: 'fallback-3',
        title: 'Cultural Exchange',
        image: '/Gallery/DSC_0673.jpg',
        location: 'Art Center New York',
        eventType: 'Community',
        isNew: false,
        order: 3,
    },
    {
        _id: 'fallback-4',
        title: 'Rhythm & Soul',
        image: '/Gallery/DSC_1387.jpg',
        location: 'Underground Berlin',
        eventType: 'Nightlife',
        isNew: false,
        order: 4,
    },
    {
        _id: 'fallback-5',
        title: 'Afro-House Night',
        image: '/Gallery/DSC_6579.jpg',
        location: 'The Warehouse',
        eventType: 'Club Event',
        isNew: true,
        order: 5,
    },
    {
        _id: 'fallback-6',
        title: 'Community Jam',
        image: '/Gallery/DSC_9805.jpg',
        location: 'Open Space London',
        eventType: 'Free Session',
        isNew: false,
        order: 6,
    },
];

interface AnnouncementItem {
    _id: string;
    title: string;
    image: string | object;
    location: string;
    eventType: string;
    isNew: boolean;
    order: number;
}

function getImageUrl(image: string | object): string {
    if (typeof image === 'string') {
        return image; // Local fallback path
    }
    // Sanity image object
    return urlFor(image).width(600).height(338).fit('crop').url();
}

export function Announcement() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(FALLBACK_ANNOUNCEMENTS);

    // Fetch from Sanity
    useEffect(() => {
        sanityClient
            .fetch<SanityAnnouncement[]>(ANNOUNCEMENTS_QUERY)
            .then((data) => {
                if (data && data.length > 0) {
                    setAnnouncements(data);
                }
                // If no data in Sanity yet, keep fallback
            })
            .catch((err) => {
                console.warn('Failed to fetch announcements from Sanity, using fallback data:', err);
            });
    }, []);

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
    }, [announcements]);

    return (
        <section className={styles.announcement} ref={sectionRef}>
            <h2 className={styles.headerTitle} ref={titleRef}>BE THE FIRST TO KNOW</h2>
            <div className={styles.container}>

                <div className={styles.grid} ref={gridRef}>
                    {announcements.map((item, index) => (
                        <article key={item._id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={getImageUrl(item.image)}
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
                                    <span className={styles.metaRight}>{item.eventType} &nbsp; ({String(index + 1).padStart(2, '0')})</span>
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
