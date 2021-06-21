export const environment = {
    production: true,
    api: {
        apero: {
            basePath: 'https://api.apero.samuelbagattin.com',
            routes: {
                endroits: '/places',
                categories: '/placeCategories',
                quartiers: '/place-districts',
                aperos: '/happy-hours',
                users: '/users',
                votes: '/votes'
            },
        },
    },
};
