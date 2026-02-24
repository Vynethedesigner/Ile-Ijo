import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: '1jlbntcf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source);
}

// Types
export interface SanityAnnouncement {
    _id: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    eventDate: string;
    location: string;
    eventType: string;
    isNew: boolean;
    order: number;
}

// Queries
export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement"] | order(order asc) {
  _id,
  title,
  image,
  eventDate,
  location,
  eventType,
  isNew,
  order
}`;
