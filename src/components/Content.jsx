import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../css/Search.css'

function Content(){
    const [location, setLocation] = useState({});
    const [link, setLink]= useState("");


    function handleChange(e){
       const {value} = e.target
       console.log(value);
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
                        <label className="field field_v1">
                            <input name="url" onChange={handleChange} className="field__input" placeholder="e.g. http://example.com" />
                                <span className="field__label-wrap">
                                    <span className="field__label">Url</span>
                                </span>
                        </label>
                        <button type="submit" onClick={handleSubmit} className="btn btn-info">Submit</button>
                    </div>
                    </form>
            </div>
        )
    }
    
}

export default Content