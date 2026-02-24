import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
    name: 'ile-ijo',
    title: 'Ilé Ijó',

    projectId: '1jlbntcf',
    dataset: 'production',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
});
