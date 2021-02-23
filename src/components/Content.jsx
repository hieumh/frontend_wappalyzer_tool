import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../css/SearchCVE.css'

function Content(){
    const [location, setLocation] = useState({});
    const [link, setLink]= useState("");
    const [hidden,setHidden] = useState({visibility: "hidden"})

    const host = 'http://localhost:3001'
    const route = '/url_analyze'

    function handleChange(e){
       const {value} = e.target
       setLink(value)
    }

    function handleSubmit(e){
        console.log("This is submit")
        e.preventDefault()
        setHidden({})

        // analyze this information on server
        fetch(host+route,{
            method:'POST',
            mode: 'cors',
            credentials:'include',
            headers:{
                'content-type': 'application/json',
            },
            body:JSON.stringify({url:link})
        }).then(res => res.json()).then(data => {
            console.log("this is technologies:" , data.technologies)
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
    } else {
        return(
            <div id='content'>
                <form method='post' action='' className='analyze'>
                    <input type='text' name='url' className='input' onChange={handleChange}/>
                    <input type='submit' value='Submit' onClick={handleSubmit} className='w3-button w3-white w3-border w3-border-blue w3-round-large inputButton'/>
                </form>
                <div class="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    
}

export default Content