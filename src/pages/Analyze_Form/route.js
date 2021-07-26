import { lazy } from 'react'

export default {
    path:'/analyze_page',
    exact:true,
    public:true,
    component:lazy(()=>import('.'))
}