import Login from '@/pages/login'
import Device from '@/pages/device'
import NoMatch from '@/pages/404'

export const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
        name: 'login',
        title: 'login',
    },
    {
        path: '/device',
        exact: true,
        component: Device,
        name: 'device',
        title: 'device',
    },
    {
        path: '*',
        component: NoMatch,
        name: '404',
        title: '404',
    },
]
