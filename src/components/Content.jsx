import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../css/SearchCVE.css'

function Content(){
    const [location, setLocation] = useState({});
    const [link, setLink]= useState("");


    function handleChange(e){
       const {value} = e.target
       setLink(value)
    }

    function handleSubmit(e){
        console.log("This is submit")
        e.preventDefault()
        setLocation({
            pathname:'/analyze_result',
            state:{
                url:link,
                isAnalyze:true
            }
        })

        // analyze this information on server
    }
    
    if(JSON.stringify(location) !== JSON.stringify({})){
        return (<Redirect to={location} />)
    } else {
        return(
            <div id='content'>
                <form method='post' action='' className='analyze'>
                    <input type='text' name='url' className='input' onChange={handleChange}/>
                    <input type='submit' value='Submit' onClick={handleSubmit} className='w3-button w3-white w3-border w3-border-blue w3-round-large inputButton'/>
                </form>
            </div>
        )
    }
    
}

export default Content