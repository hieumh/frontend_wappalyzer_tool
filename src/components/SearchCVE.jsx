import React, { useState} from 'react'
import {host} from '../lib_front'
import '../css/Report.css'
import '../css/SearchCVE.css'
import '../css/Animation.css'

function SearchCVE(){
    const [search, setSearch] = useState({
        target:'',
        year:''
    })
    const [hidden,setHidden] = useState({visibility: "hidden"})
    const [cves, setCVES] = useState([])

    function handleChange(e){
        const {name,value} = e.target
        setSearch((prev)=>{
            return({
                ...prev,
                [name]:value
            })
        })
        // setSearch(value)
     }
 
    function handleSubmit(e){
        console.log("This is submit")
        e.preventDefault()
        console.log(search)
        let link = host+'/search/'+search.target+'/'+search.year
        setHidden({})
        
        fetch(link,{
            method:'get',
            mode: 'cors',
            headers:{
                'content-type': 'application/json'
            }
        }).then(data => data.json()).then(data => {
            console.log("this is technologies:" , data)
            let result = []
            for (const index in data){
                result.push(data[index])
            }
            console.log("result:",result)
            setCVES(result)
            setHidden({visibility: "hidden"})
        })
    }

    return(
        <div>
            <form method='post' action='' className='analyze'>
            <label htmlFor="target">Target:</label>
            <input type='text' name='target' className='input' onChange={handleChange}/>
            <label htmlFor="year">Year:</label>
            <input type='text' name='year' className='input' onChange={handleChange}/>
            <input type='submit' value='Submit' onClick={handleSubmit} className='w3-button w3-white w3-border w3-border-blue w3-round-large inputButton'/>
                </form>
                <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <ul id='cve'>{
                cves.map((element)=>{
                    console.log("this is cve")
                    return(
                        <li key={element.cve} className='content'>
                            <h3>CVE: {element.cve}</h3>
                            <p>Year: {element.year}</p>
                            <p>Description: {element.desc}</p>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default SearchCVE