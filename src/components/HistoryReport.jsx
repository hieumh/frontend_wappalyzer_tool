import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import {host} from '../lib_front'
import '../css/History.css'
import '../css/Card.css'


function HistoryReport(){
    const [history,setHistory] = useState([])
    const [location, setLocation] = useState({})
        
    useEffect(()=>{
        fetch(host+'/history',{
            mode:'cors',
            headers:{
            'content-type': 'application/json'
        }}).then(data=>data.json()).then(data =>{
            console.log(data);
            setHistory(data)
        })
    },[])

    function handleClick(e){
        const name = e.target.getAttribute('id')
            setLocation({
                pathname:'/analyze_result',
                state:{
                    url:name,
                    isAnalyze:false
                }
            })
    }

    if(JSON.stringify(location) !== JSON.stringify({})){
        return (<Redirect to={location} />)
    }
    return(
        <div id='history'>
        <div className='history-card'>
            <div className='card-header'>
                <h3 className='card-title'>History</h3>
                <p className='card-category'>All report in database</p>
            </div>
            <div className='card-body table-full-width table-responsive'>
                <table className='table table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Url</th>
                            <th>Created time</th>
                            <th>Create HTML file</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.length !== 0 ? history.map((element, index)=>{
                                return (<tr key={index}>
                                    <td>{index}</td>
                                    <td>{element.url}</td>
                                    <td>{element.time_create}</td>
                                    <td><button className='btn btn-secondary btn-lg btn-block'>Create HTML file</button></td>
                                </tr>)
                            }) : <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>


        </div>
    )
}

export default HistoryReport