import React, { useState} from 'react'
import {host} from '../lib_front'
import '../css/Report.css'
import '../css/Search.css'
import '../css/Animation.css'
import '../css/Card.css'

function Search(){
    const [search, setSearch] = useState({
        target:'',
        year:''
    })
    const [hidden,setHidden] = useState({visibility: "hidden"})
    const [cves, setCVES] = useState([])

    function handleChange(e){
        if(e.keyCode === 13){
            handleSubmit(e)
            return
        }

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
        <div id="search">
            <div id='search-card'>
                <div className="card-header">
                    <h3 className='card-title'>Search Database</h3>
                    <p className='card-category'>Search information about report in database</p>
                </div>
                <div id="search-bar" className='card-body'>
                    <p>All of this information are taken in database that were collected report by us</p>
                <form method='post' action='' className='analyze'>
                     <div id="input-box">
                <img src="/icons/website/search-solid_2.svg" alt=""/>
                <input type='text' name='target' className='input' placeholder="Search..." onChange={handleChange} />
                 </div>
                </form>
                </div>    

                <div id='search-result'>
                    <h4>Search result:</h4>
                    {/* All information will be saved here */}

                </div>
            </div>
        </div>
    )
}

export default Search