import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import {host} from '../lib_front'
import '../css/History.css'
import '../css/Card.css'


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
        {/* <table id="history" style={styleTable}>
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
                            <td id={ele.urls} onClick={handleClick}>{ele._id}</td>
                            <td>{ele.urls}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table> */}


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
                            <th>Create PDF file</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>


        </div>
    )
}

export default HistoryReport