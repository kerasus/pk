// https://nuxtjs.org/docs/directory-structure/middleware/#named-middleware
export default function auth({ store, to, next, router }) {
    let token = store.getters['Auth/accessToken']

    if (to.name === 'login') {
        return next();
    }

    if (!token) {
        store.commit('Auth/updateRedirectTo', to.name)
        return router.push({ name: 'login' });
    }
}
