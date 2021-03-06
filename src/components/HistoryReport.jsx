import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import {host} from '../lib_front'
import '../css/History.css'


function HistoryReport(){
    const [history,setHistory] = useState([])
    const [location, setLocation] = useState({})
    const styleTable ={"marginTop": "5px",
        "marginLeft": "5px"}

    useEffect(()=>{
        fetch(host+'/report',{mode:'cors',headers:{
            'content-type': 'application/json'
        }}).then(data=>data.json()).then(data =>{
            setHistory(data)
        })
    },[])

    function handleClick(e){
        const name = e.target.getAttribute('id')
        fetch(host+'/report/'+name,{mode:'cors',headers:{'content-type':'application/json'}}).then(data => data.json()).then(data => {
            setLocation({
                pathname:'/analyze_result',
                state:{
                    tech:data.technologies
                }
            })
        })
    }

    if(JSON.stringify(location) !== JSON.stringify({})){
        return (<Redirect to={location} />)
    }
    return(
        <div>
        <table id="history" style={styleTable}>
        <tbody>
        <tr>
            <th>_id</th>
            <th>Website</th>
         </tr>
            {
                history.map(ele=>{
                    console.log(ele)
                    return(
                        <tr key={ele._id}>
                            <td id={ele._id} onClick={handleClick}>{ele._id}</td>
                            <td>{ele.urls}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        <br />
        <p>Click on id to go to Report</p>
        </div>
    )
}

export default HistoryReport