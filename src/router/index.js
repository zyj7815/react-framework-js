import loadable from '@loadable/component'
// import Login from '../page/login'
// import Device from '../page/device'

export const routes = [
    {
        path: '/',
        exact: true,
        component: loadable(() => import('../pages/login')),
        name: 'login',
        title: 'lofin',
        auth: false
    },
    {
        path: '/device',
        exact: true,
        component: loadable(() => import('../pages/device')),
        name: 'device',
        title: 'device',
        auth: false
    },
    {
        path: '*',
        component: loadable(() => import('../pages/404')),
        name: '404',
        title: '404',
    }
]
