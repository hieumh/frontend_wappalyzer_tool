import { lazy } from 'react'

export default {
    path:'/about',
    exact:true,
    public:true,
    component:lazy(()=>import('.'))
}