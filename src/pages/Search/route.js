import { lazy } from 'react'

export default {
    path:'/search',
    exact:true,
    public:true,
    component:lazy(()=>import('.'))
}