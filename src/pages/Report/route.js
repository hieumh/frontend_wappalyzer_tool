import { lazy } from 'react'

export default {
    path: '/report',
    exact: true,
    public: true,
    component: lazy(() => import('.'))
}