import React,{useState,useEffect} from 'react'
import {TabDic,TabServer, TabDNS, TabDomain, TabTech} from './Tabs'
import {host} from '../lib_front'
import '../css/Report.css'
import '../css/Card.css'


function AnalyzeResult(props){
    const [wapp, setWapp] = useState([])
    const [netcraft, setNetcraft] = useState([])
    const [largeio, setLargeio] = useState([])
    const [domain, setDomain] = useState("")
    const [dic, setDic] = useState("")
    const [serverInfor, setServerInfor] = useState("")
    const [dnsInfor, setDnsInfor] = useState("")


    useEffect(async ()=>{
        let {url,isAnalyze} = props.location.state
        console.log(url, isAnalyze)

        await getData(url,isAnalyze)
    },[])

    // send request to server to get information
    async function getData(url,isAnalyze){
        let method='post'
        let query=''
        let body=JSON.stringify({url:url})
        if(!isAnalyze){
            method='get'
            query="?url="+url
            body=''
        }

        console.log(method,query,body)
    
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
    
        // fetch for domain
        fetch(host+'/url_analyze/domain'+query,{
            method:method,
            mode: 'cors',
            credentials:'include',
            headers:{
                'content-type': 'application/json',
            },
            body:body
        }).then(res => res.json()).then(data => {
            console.log("this is domain :" , data)
            setDomain(data)
        })
    
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
    
        // fetch for server
        // fetch(host+'/url_analyze/server'+query,{
        //     method:method,
        //     mode: 'cors',
        //     credentials:'include',
        //     headers:{
        //         'content-type': 'application/json',
        //     },
        //     body:body
        // }).then(res => res.json()).then(data => {
        //     console.log("this is Server information:" , data)
        //     setServerInfor(data)
        // })
    
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
            setDnsInfor(JSON.stringify(data)) 
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
    }

    // if(tech == ""){
    //     return (
    //         <div >
    //             <p>We found nothing ... </p>
    //         </div>
    //     )
    // }
    // return(
    //     <div id="report">
    //         <Tabs>
    // <TabList className="nav-report">
    //   <Tab>Technologies</Tab>
    //   <Tab>Domain</Tab>
    //   <Tab>Dictionary tree</Tab>
    //   <Tab>DNS</Tab>
    //   <Tab>Server</Tab>
    // </TabList>
    // <TabPanel>
    //     <TabTech tech={[wapp,netcraft,largeio]}/>
    // </TabPanel>
    // <TabPanel>
    //     <TabDomain domain={domain}/>
    // </TabPanel>
    // <TabPanel>
    //     <TabDic dic={dic} />
    // </TabPanel>
    // <TabPanel>
    //     <TabDNS dns={dnsInfor} />
    // </TabPanel>
    // <TabPanel>
    //     <h2>{serverInfor}</h2>
    // </TabPanel>
    // </Tabs>
    //     </div>
    // )

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
          <TabDomain domain={domain}/>
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
          <h2>{serverInfor}</h2>
          </div>
        </div>
    </div>
    </div>)
}

export default AnalyzeResult

{/* <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
