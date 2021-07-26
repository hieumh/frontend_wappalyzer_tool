import { lazy } from 'react'

export default {
    path:'/history',
    exact:true,
    public:true,
    component:lazy(()=>import('.'))
}