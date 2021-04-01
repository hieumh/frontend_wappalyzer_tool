import React from 'react'
import {host} from '../lib_front'


function About(){
    let route = '/urls_tree?url=docs.mongodb.com/manual/reference/log-messages/'
    fetch(host+route,{
        method:'GET',
        mode: 'cors',
        headers:{
            'content-type': 'application/json',
        }
    }).then(res => res.json()).then(data => {
        console.log("this is data:" , data)
    })

    return(
        <div>About Here</div>
    )
}

export default About