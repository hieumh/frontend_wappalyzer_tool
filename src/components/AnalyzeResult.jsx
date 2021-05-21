import React,{useState,useEffect} from 'react'
import {TabDic,TabServer, TabDNS, TabDomain, TabTech, TabDetectWaf, TabScan, TabVuln} from './Tabs'
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

    const [dig, setDig] = useState("")
    const [fierce, setFierce] = useState("")

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
                query="?token="+token
                body=''
            }
    
            // console.log(method,query,body)
            ////////////////////////////////////////
            // fetch for technologies
            // fetch for Tech
            await fetch(host+'/url_analyze/wapp'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                console.log("this wappalyzer",data)
                setWapp(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech: prevState.countTech+1
                    }
                })
            }).catch(err=>console.error(err))
    
            // netcrafts
            fetch(host+'/url_analyze/netcraft'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                console.log("this netcraft:", data)
                setNetcraft(data.technologies === "a" ? [] : data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            }).catch(err=>console.error(err))
        
            // largeio
            fetch(host+'/url_analyze/largeio'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this largeio")
                setLargeio(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            }).catch(err=>console.error(err))
    
            // Whatwebb
            fetch(host+'/url_analyze/whatweb'+query,{
                method: method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this whatweb")
                setWhatweb(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            }).catch(err=>console.error(err))
    
            // Webtech
            fetch(host+'/url_analyze/webtech'+query,{
                method: method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this webtech")
                setWebtech(data.technologies)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countTech:prevState.countTech+1
                    }
                })
            }).catch(err=>console.error(err))
    
            //////////////////////////////////////////////////////////////////
        
            ////////////////////////////////////////////////////////////////
            // fetch for domain
            fetch(host+'/url_analyze/whois'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this whois")
                setWhois(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDomain:prevState.countDomain+1
                    }
                })
            }).catch(err=>console.error(err))
    
            fetch(host+'/url_analyze/sublist3r'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this sublist3r")
                setSublist3r(data.subdomains)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDomain:prevState.countDomain+1
                    }
                })
            }).catch(err=>console.error(err))
            /////////////////////////////////////////////////////////////////
        
            ////////////////////////////////////////////////////////////////
            // fetch for dic
            fetch(host+'/url_analyze/dic'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this dic")
                setDic(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDic:prevState.countDic+1
                    }
                })
            }).catch(err=>console.error(err))
    
            fetch(host+'/url_analyze/gobuster'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this gobuster")
                setGobuster(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDic:prevState.countDic+1
                    }
                })
            }).catch(err=>console.error(err))
    
            ///////////////////////////////////////////////////////////////////
        
            // fetch for server
            fetch(host+'/url_analyze/server'+query,{
                method:method,
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this nmap")
                setServerInfor(data.nmap)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countServer:prevState.countServer+1
                    }
                })
            }).catch(err=>console.error(err))
        
            // fetch for DNS
            fetch(host+'/url_analyze/dig'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this dns")
                setDig(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDns:prevState.countDns+1
                    }
                })
            }).catch(err=>console.error(err))

            fetch(host+'/url_analyze/fierce'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this dns")
                setFierce(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countDns:prevState.countDns+1
                    }
                })
            }).catch(err=>console.error(err))
    
            // fetch for detect web firewall
            fetch(host+'/url_analyze/wafw00f'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this wafw00f")
                setWafw00f(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countWaf:prevState.countWaf+1
                    }
                })
            }).catch(err=>console.error(err))

            fetch(host+'/url_analyze/nikto'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this nikto")
                setNikto(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            }).catch(err=>console.error(err))
        

            //////////////////////////////////////////////
            let checkCms = await fetch(host+'/url_analyze/cmseek',{
                method:'POST',
                mode:"cors",
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            })
            checkCms = await checkCms.json()
            console.log(checkCms)

            if(checkCms.cms_name){
                // fetch for scanning website
                console.log("have cms");
            fetch(host+'/url_analyze/wpscan'+query,{
                method:'POST',
                mode: 'cors',
                
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this wpscan")

                setWpscan(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            }).catch(err=>console.error(err))
    
            fetch(host+'/url_analyze/droopescan'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this droope")
                setDroope(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            }).catch(err=>console.error(err))
    
            fetch(host+'/url_analyze/joomscan'+query,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'content-type': 'application/json',
                },
                body:body
            }).then(res => res.json()).then(data => {
                // console.log("this joomscan")
                setJoomscan(data)
                setCount((prevState)=>{
                    return {
                        ...prevState,
                        countScan:prevState.countScan+1
                    }
                })
            }).catch(err=>console.error(err))
            } else {
                console.log("no cms");
            }
        }
            

        let {url, token, isAnalyze} = props.location.state
        
        // url = "http://example.com/"
        url = 'https://wavecell.com/'
        // console.log(url, isAnalyze)
        await getData(url, token, isAnalyze)
    },[])

    async function handleSubmit(e){
        e.preventDefault()
        let {url, token} = props.location.state
        // url = "http://example.com/"
        url = 'https://wavecell.com/'
        let body=JSON.stringify({url:url, token: token})
        let result = await fetch(host+'/create_report',{
            method:"post",
            mode: 'cors',
            
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
    <div className="tabs__">
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-1" defaultChecked className="tab-switch__"/>
          <label htmlFor="tab-1" className="tab-label__" onClick={handleNotify} id="countTech">Technologies
          {count.countTech === 0 ? null : <span className="notification-tab">{count.countTech}</span>}
          </label>
          
          <div className="tab-content__"> 
          <div className="card-header__">
                <h3 className="card-title__">Technologies</h3>
                <p className="card-category__">Information about the platform of target website</p>
          </div>
          <TabTech tech={[wapp,netcraft,largeio,webtech,whatweb]}/>
          </div>
          </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-2" className="tab-switch__"/>
          <label htmlFor="tab-2" className="tab-label__" onClick={handleNotify} id="countDomain">Domain
          {count.countDomain === 0 ? null : <span className="notification-tab">{count.countDomain}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Domain</h3>
                <p className="card-category__">Information about the domain of target website</p>
          </div>
          <TabDomain domain={[whois,sublist3r]}/>
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-3" className="tab-switch__"/>
          <label htmlFor="tab-3" className="tab-label__" onClick={handleNotify} id="countDic">Directory  tree
          {count.countDic === 0 ? null : <span className="notification-tab">{count.countDic}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Directory</h3>
                <p className="card-category__">Information about the dictionary of target website</p>
          </div>
          <TabDic dic={[dic,gobuster]} />
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-4" className="tab-switch__"/>
          <label htmlFor="tab-4" className="tab-label__" onClick={handleNotify} id="countDns">DNS
          {count.countDns === 0 ? null : <span className="notification-tab">{count.countDns}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">DNS</h3>
                <p className="card-category__">Information about the dns of target website</p>
          </div>
          <TabDNS dns={[dig,fierce]} />
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-5" className="tab-switch__"/>
          <label htmlFor="tab-5" className="tab-label__" onClick={handleNotify} id="countServer">Server Information
          {count.countServer === 0 ? null : <span className="notification-tab">{count.countServer}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Server</h3>
                <p className="card-category__">Information about the server of target website</p>
          </div>
          <TabServer nmap={serverInfor ? serverInfor : ""}/>
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-6" className="tab-switch__"/>
          <label htmlFor="tab-6" className="tab-label__" onClick={handleNotify} id="countWaf">Detect web firewall
          {count.countWaf === 0 ? null : <span className="notification-tab">{count.countWaf}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Detect web firewall</h3>
                <p className="card-category__">Information about the web application firewall of target website</p>
          </div>
          <TabDetectWaf wafw00f={wafw00f}/>
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-7" className="tab-switch__"/>
          <label htmlFor="tab-7" className="tab-label__" onClick={handleNotify} id="countScan">Server scanning
          {count.countScan === 0 ? null : <span className="notification-tab">{count.countScan}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Server</h3>
                <p className="card-category__">Information about the server of target website</p>
          </div>
          <TabScan scans={[wpscan,droopescan,joomscan,nikto]}/>
          </div>
        </div>
        <div className="tab__">
          <input type="radio" name="css-tabs" id="tab-8" className="tab-switch__"/>
          <label htmlFor="tab-8" className="tab-label__" onClick={handleNotify} id="countScan">Vulnerability
          {count.countTech === 0 ? null : <span className="notification-tab">{count.countTech}</span>}
          </label>
          <div className="tab-content__">
          <div className="card-header__">
                <h3 className="card-title__">Vulnerability</h3>
                <p className="card-category__">Information about the vulnerability of the target website</p>
          </div>
          <TabVuln token={props.location.state.token} vulns={[wapp,netcraft,largeio,webtech,whatweb, wpscan,droopescan,joomscan,nikto,serverInfor]} />
          {/* <TabVuln token={props.location.state.token} vulns={vulns}/>  */}
          </div>
        </div>
    </div>
    
    </div>)
}

export default AnalyzeResult

{/* <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
    