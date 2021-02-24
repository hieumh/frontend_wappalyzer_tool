import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import {host} from '../lib_front'


function LastReport(){
    const [location,setLocation] = useState({})
    useEffect(()=>{
        fetch(host+'/last_report',{mode:'cors',headers:{'content-type':'application/json'}}).then(data => data.json()).then(data => {
            setLocation({
                pathname:'/analyze_result',
                state:{
                    tech:data.technologies
                }
            })
        })
    })
    if(JSON.stringify(location) !== JSON.stringify({})){
        return (<Redirect to={location} />)
    }
    return (<div>
        Doesn't have report yet
    </div>)
}

export default LastReport