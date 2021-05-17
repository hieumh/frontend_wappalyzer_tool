import React,{useState,useEffect} from 'react'
import {TabDic,TabServer, TabDNS, TabDomain, TabTech, TabDetectWaf, TabScan} from './Tabs'
import {host} from '../lib_front'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/Report.css'
import '../css/Card.css'


function AnalyzeResult(props){
    const [wapp, setWapp] = useState([])
    const [netcraft, setNetcraft] = useState([])
    const [largeio, setLargeio] = useState([])
    const [whatweb, setWhatweb] = useState([])
    const [webtech, setWebtech] = useState([])

    const [wafw00f,setWafw00f] = useState("")
    const [wpscan, setWpscan] = useState("")
    const [droopescan, setDroope] = useState("")
    const [joomscan,setJoomscan] = useState("")
    const [nikto, setNikto] = useState("")

    const [whois, setWhois] = useState("")
    const [sublist3r, setSublist3r] = useState([])

    const [gobuster, setGobuster] = useState("")
    const [dic, setDic] = useState("")

    const [dnsInfor, setDnsInfor] = useState("")

    const [serverInfor, setServerInfor] = useState("")

    const [count, setCount] =useState({
        countTech:0,
        countDomain:0,
        countDns:0,
        countDic:0,
        countServer:0,
        countWaf:0,
        countScan:0
    })



    // use Effect for fetch data
    useEffect(async ()=>{
        async function getData(url, token, isAnalyze){
            let method='post'
            let query=''
            let body=JSON.stringify({url:url, token: token})
            if(!isAnalyze){
                method='get'
                query="?url="+url
                body=''
            }
    
            console.log(method,query,body)
            ////////////////////////////////////////
            // fetch for technologies
            // fetch for Tech
            await fetch(host+'/url_analyze/wapp'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWapp(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech: prevState.countTech+1
                    }
                })
            })
    
            // netcrafts
            fetch(host+'/url_analyze/netcraft'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setNetcraft(data.technologies === "a" ? [] : data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            })
        
            // largeio
            fetch(host+'/url_analyze/largeio'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setLargeio(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            })
    
            // Whatwebb
            fetch(host+'/url_analyze/whatweb'+query,{
                method: method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWhatweb(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            })
    
            // Webtech
            fetch(host+'/url_analyze/webtech'+query,{
                method: method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWebtech(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            })
    
            //////////////////////////////////////////////////////////////////
        
            ////////////////////////////////////////////////////////////////
            // fetch for domain
            fetch(host+'/url_analyze/whois'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWhois(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDomain:prevState.countDomain+1
                    }
                })
            })
    
            fetch(host+'/url_analyze/sublist3r'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setSublist3r(data.subdomains)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDomain:prevState.countDomain+1
                    }
                })
            })
            /////////////////////////////////////////////////////////////////
        
            ////////////////////////////////////////////////////////////////
            // fetch for dic
            fetch(host+'/url_analyze/dic'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setDic(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDic:prevState.countDic+1
                    }
                })
            })
    
            fetch(host+'/url_analyze/gobuster'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setGobuster(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDic:prevState.countDic+1
                    }
                })
            })
    
            ///////////////////////////////////////////////////////////////////
        
            // fetch for server
            fetch(host+'/url_analyze/server'+query,{
                method:method,
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setServerInfor(data.nmap)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countServer:prevState.countServer+1
                    }
                })
            })
        
            // fetch for DNS
            fetch(host+'/url_analyze/dns'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setDnsInfor(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDns:prevState.countDns+1
                    }
                })
            })
    
            // fetch for detect web firewall
            fetch(host+'/url_analyze/wafw00f'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWafw00f(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countWaf:prevState.countWaf+1
                    }
                })
            })
    
            // fetch for scanning website
            fetch(host+'/url_analyze/wpscan'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setWpscan(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            })
    
            fetch(host+'/url_analyze/droopescan'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setDroope(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            })
    
            fetch(host+'/url_analyze/joomscan'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setJoomscan(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            })
    
            fetch(host+'/url_analyze/nikto'+query,{
                method:'POST',
                mode: 'cors',
                credentials:'include',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                setNikto(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            })
        }

        let {url, token, isAnalyze} = props.location.state
        
        url = "http://example.com/"
        console.log(url, isAnalyze)
        await getData(url, token, isAnalyze)
    },[])


    async function handleSubmit(e){
        e.preventDefault()
        let {url, token} = props.location.state
        url = "http://example.com/"
        let body=JSON.stringify({url:url, token: token})
        let result = await fetch(host+'/create_report',{
            method:"post",
            mode: 'cors',
            credentials:'include',
            headers:{
                'content-type': 'application/json',
            },
            body:body
        })
        toast.success("Create report success")
    }

    function handleNotify(e){
        setCount((prevState)=>{
            return {
                ...prevState,
                [e.target.id]:0
            }
        })
    }

    return(<div id="report">
        
    <button className="create-report btn btn-info" onClick={handleSubmit}>Create report</button>
    <ToastContainer />
    <div className="tabs">
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-1" defaultChecked className="tab-switch"/>
          <label htmlFor="tab-1" className="tab-label" onClick={handleNotify} id="countTech">Technologies
          {count.countTech === 0 ? null : <span className="notification-tab">{count.countTech}</span>}
          </label>
          
          <div className="tab-content"> 
          <div className="card-header">
                <h3 className="card-title">Technologies</h3>
                <p className="card-category">Information about the platform of target website</p>
          </div>
          <TabTech tech={[wapp,netcraft,largeio,webtech,whatweb]}/>
          </div>
          </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-2" className="tab-switch"/>
          <label htmlFor="tab-2" className="tab-label" onClick={handleNotify} id="countDomain">Domain
          {count.countDomain === 0 ? null : <span className="notification-tab">{count.countDomain}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Domain</h3>
                <p className="card-category">Information about the domain of target website</p>
          </div>
          <TabDomain domain={[whois,sublist3r]}/>
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-3" className="tab-switch"/>
          <label htmlFor="tab-3" className="tab-label" onClick={handleNotify} id="countDic">Directory  tree
          {count.countDic === 0 ? null : <span className="notification-tab">{count.countDic}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Directory</h3>
                <p className="card-category">Information about the dictionary of target website</p>
          </div>
          <TabDic dic={[dic,gobuster]} />
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-4" className="tab-switch"/>
          <label htmlFor="tab-4" className="tab-label" onClick={handleNotify} id="countDns">DNS
          {count.countDns === 0 ? null : <span className="notification-tab">{count.countDns}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">DNS</h3>
                <p className="card-category">Information about the dns of target website</p>
          </div>
          <TabDNS dns={dnsInfor} />
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-5" className="tab-switch"/>
          <label htmlFor="tab-5" className="tab-label" onClick={handleNotify} id="countServer">Server Information
          {count.countServer === 0 ? null : <span className="notification-tab">{count.countServer}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Server</h3>
                <p className="card-category">Information about the server of target website</p>
          </div>
          <TabServer nmap={serverInfor ? serverInfor : ""}/>
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-6" className="tab-switch"/>
          <label htmlFor="tab-6" className="tab-label" onClick={handleNotify} id="countWaf">Detect web firewall
          {count.countWaf === 0 ? null : <span className="notification-tab">{count.countWaf}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Detect web firewall</h3>
                <p className="card-category">Information about the web application firewall of target website</p>
          </div>
          <TabDetectWaf wafw00f={wafw00f}/>
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-7" className="tab-switch"/>
          <label htmlFor="tab-7" className="tab-label" onClick={handleNotify} id="countScan">Server scanning
          {count.countScan === 0 ? null : <span className="notification-tab">{count.countScan}</span>}
          </label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Server</h3>
                <p className="card-category">Information about the server of target website</p>
          </div>
          <TabScan scans={[wpscan,droopescan,joomscan,nikto]}/>
          </div>
        </div>
    </div>
    
    </div>)
}

export default AnalyzeResult

{/* <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
    