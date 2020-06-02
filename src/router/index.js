import loadable from '@loadable/component'
// import Login from '../page/login'
// import Device from '../page/device'

export const routes = [
    {
        path: '/',
        exact: true,
        component: loadable(() => import('../page/login')),
        name: 'login',
        title: 'lofin',
    },
    {
        path: '/device',
        exact: true,
        component: loadable(() => import('../page/device')),
        name: 'device',
        title: 'device',
    }
]