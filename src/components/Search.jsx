import React, { useState} from 'react'
import {host} from '../lib_front'
import '../css/Report.css'
import '../css/Search.css'
import '../css/Animation.css'
import '../css/Card.css'

function Search(){
    const [search, setSearch] = useState("")
    const [hidden,setHidden] = useState({visibility: "hidden"})

    function handleChange(e){
        if(e.keyCode === 13){
            document.getElementById("submit-button").click()
            return
        }

        const {value} = e.target
        setSearch(value)
        // setSearch(value)
     }
 
    function handleSubmit(e){
        e.preventDefault()

        let link = host+'/search_database?pattern='+search
        setHidden({})
        
        fetch(link,{
            method:'get',
            mode: 'cors',
            headers:{
                'content-type': 'application/json'
            }
        }).then(data => data.json()).then(data => {

            let result = []
            for (const index in data){
                result.push(data[index])
            }   
            console.log("result:",result)
        })
    }


    return(
        <div id="search">
            <div id='search-card'>
                <div className="card-header__">
                    <h3 className='card-title__'>Search Database</h3>
                    <p className='card-category__'>Search information about report in database</p>
                </div>
                <div id="search-bar" className='card-body__'>
                    <p>All of this information will be taken in database that were collected by us</p>
                <form method='get' action='' className='analyze'>
                    <div id="input-box">
                        <img src="/icons/website/search-solid_2.svg" alt=""/>
                        <input type='text' name='target' className='input' placeholder="Search..." onChange={handleChange} />
                        <input id="submit-button" type='submit' onClick={handleSubmit} hidden/>
                    </div>
                </form>
                </div>    

                <div id='search-result' style={hidden}>
                    <h4>Search result:</h4>
                    {/* All information will be saved here */}

                </div>
            </div>
        </div>
    )
}

export default Search