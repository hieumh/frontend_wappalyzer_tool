import React,{useState,useEffect} from 'react'
import {TabDic,TabServer, TabDNS, TabDomain, TabTech} from './Tabs'
import {host} from '../lib_front'
import '../css/Report.css'
import '../css/Card.css'


function AnalyzeResult(props){
    const [wapp, setWapp] = useState([])
    const [netcraft, setNetcraft] = useState([])
    const [largeio, setLargeio] = useState([])
    const [whatweb, setWhatweb] = useState([])
    const [webtech, setWebtech] = useState([])
    const [watw00f,setWafw00f] = useState("")
    const [wpscan, setWpscan] = useState("")
    const [droope, setDroope] = useState("")
    const [nikto, setNikto] = useState("")

    const [whois, setWhois] = useState("")
    const [sublist3r, setSublist3r] = useState("")

    const [gobuster, setGobuster] = useState("")
    const [dic, setDic] = useState("")

    const [dnsInfor, setDnsInfor] = useState("")

    const [serverInfor, setServerInfor] = useState("")


    useEffect(async ()=>{
        let {url, token, isAnalyze} = props.location.state
        

        url = "http://example.com/"
        console.log(url, isAnalyze)
        await getData(url, token, isAnalyze)
    },[])

    // send request to server to get information
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
            console.log("this is technologies:" , data.technologies)
            setWapp(data.technologies)
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
            setNetcraft(data.technologies)
            console.log("this is netcraft infor:" , data)
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
            console.log("this is largeio infor:" , data)
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
            console.log("this is Whatwebb infor:" , data)
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
            console.log("this is largeio infor:" , data)
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
            console.log("this is whois :" , data)
            setWhois(data)
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
            console.log("this is sublist3r :" , data)
            setSublist3r(data)
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
            console.log("this is dic:" , data)
            setDic(data)
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
            console.log("this is gobuster :" , data)
            setGobuster(data)
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
            console.log("this is Server information:" , data)
            setServerInfor(data)
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
            console.log("this is dns infor:" , data)
            setDnsInfor(data) 
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
            console.log("this is wafw00f infor:" , data)
            setWafw00f(JSON.stringify(data)) 
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
            console.log("this is wpscan infor:" , data)
            setWpscan(JSON.stringify(data)) 
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
            console.log("this is droopescan infor:" , data)
            setDroope(JSON.stringify(data)) 
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
            console.log("this is nikto infor:" , data)
            setNikto(JSON.stringify(data)) 
        })
    }

    return(<div id="report">
    <div className="tabs">
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-1" defaultChecked className="tab-switch"/>
          <label htmlFor="tab-1" className="tab-label">Technologies</label>
          <div className="tab-content"> 
          <div className="card-header">
                <h3 className="card-title">Technologies</h3>
                <p className="card-category">Information about the platform of target website</p>
          </div>
          <TabTech tech={[wapp,netcraft,largeio]}/>
          </div>
          </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-2" className="tab-switch"/>
          <label htmlFor="tab-2" className="tab-label">Domain</label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Domain</h3>
                <p className="card-category">Information about the domain of target website</p>
          </div>
          <TabDomain domain={whois}/>
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-3" className="tab-switch"/>
          <label htmlFor="tab-3" className="tab-label">Dictionary tree</label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Dictionary</h3>
                <p className="card-category">Information about the dictionary of target website</p>
          </div>
          <TabDic dic={dic} />
          </div>
        </div>
        <div className="tab">
          <input type="radio" name="css-tabs" id="tab-4" className="tab-switch"/>
          <label htmlFor="tab-4" className="tab-label">DNS</label>
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
          <label htmlFor="tab-5" className="tab-label">Server Information</label>
          <div className="tab-content">
          <div className="card-header">
                <h3 className="card-title">Server</h3>
                <p className="card-category">Information about the server of target website</p>
          </div>
          <TabServer nmap={serverInfor}/>
          </div>
        </div>
    </div>
    </div>)
}

export default AnalyzeResult

{/* <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
