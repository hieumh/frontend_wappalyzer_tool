import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import {host} from '../lib_front'
import {Button, Table} from 'semantic-ui-react'
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

    // get back to analyze result
    function handleClick(e){
        if(e.target.parentNode.id){
            setLocation({
                pathname:'/analyze_result',
                state:{
                    token:e.target.parentNode.id,
                    url:e.target.parentNode.childNodes[1].innerHTML,
                    isAnalyze:false
                }
            })
        }
            
    }

    // create html file
    function handleSubmit(e){
        console.log("handle submit")
        localStorage.setItem("report", JSON.stringify(history[e.target.id]))
        window.open("http://localhost:3001/report", "_blank") //to open new page
    }

    if(JSON.stringify(location) !== JSON.stringify({})){
        return (<Redirect to={location} />)
    }
    return(
        <div id='history'>
        <div className='history-card'>
            <div className='card-header__'>
                <h3 className='card-title__'>History</h3>
                <p className='card-category__'>All report in database</p>
            </div>
            <div className='card-body__'>
            <Table singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Url</Table.HeaderCell>
                    <Table.HeaderCell>Created time</Table.HeaderCell>
                    <Table.HeaderCell>Create HTML file</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        <Table.Body>
        {
                            history.length !== 0 ? history.map((element, index)=>{
                                return (<Table.Row id={element.token} key={index} onClick={handleClick}>
                                    <Table.Cell>{element._id}</Table.Cell>
                                    <Table.Cell>{element.url}</Table.Cell>
                                    <Table.Cell>{element.time_create}</Table.Cell>
                                    <Table.Cell><Button id={index}onClick={handleSubmit}>Create HTML file</Button></Table.Cell>
                                    </Table.Row>)
                            }) : null
        }
        </Table.Body>
  </Table>
            </div>
        </div>
        </div>
    )
}

export default HistoryReport