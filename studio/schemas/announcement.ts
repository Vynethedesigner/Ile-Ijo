import { defineType, defineField } from 'sanity';

export const announcement = defineType({
    name: 'announcement',
    title: 'Announcement',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Event Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eventDate',
            title: 'Event Date',
            type: 'date',
            options: {
                dateFormat: 'DD-MM-YYYY',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Private Event', value: 'Private Event' },
                    { title: 'Workshop', value: 'Workshop' },
                    { title: 'Community', value: 'Community' },
                    { title: 'Nightlife', value: 'Nightlife' },
                    { title: 'Club Event', value: 'Club Event' },
                    { title: 'Free Session', value: 'Free Session' },
                    { title: 'Festival', value: 'Festival' },
                    { title: 'Pop-up', value: 'Pop-up' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isNew',
            title: 'Show "NEW" Badge',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 1,
            validation: (Rule) => Rule.required(),
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'location',
            media: 'image',
        },
    },
});
