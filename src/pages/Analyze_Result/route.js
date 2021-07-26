import { lazy } from 'react'

export default {
    path:'/analyze_result',
    exact:true,
    public:true,
    component:lazy(()=>import('.'))
}