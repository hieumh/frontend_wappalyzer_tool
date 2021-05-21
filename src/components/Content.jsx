import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import '../css/Search.css'

function Content(){
    const [location, setLocation] = useState({});
    const [link, setLink]= useState("");


    function handleChange(e){
       const {value} = e.target
       setLink(value)
    }

    async function handleSubmit(e){
        console.log("This is submit")
        e.preventDefault()
        
        // Get token 
        let response = await fetch('http://localhost:3000/token/generator');
        let token = await response.text();

        setLocation({
            pathname:'/analyze_result',
            state:{
                url:link,
                token: token,
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
                <form method='post' action=''>
                    <div className="page">
                        <h4>Enter Url</h4>
                        <Input label='http://' placeholder='mysite.com' onChange={handleChange} value={link}/>
                        <button type="submit" onClick={handleSubmit} className="btn btn-info">Submit</button>
                    </div>
                    </form>
            </div>
        )
    }
    
}

export default Content