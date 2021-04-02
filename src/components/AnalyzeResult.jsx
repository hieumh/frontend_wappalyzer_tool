import React,{useState,useEffect} from 'react'
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs'
import {TabDic,TabServer, TabDNS, TabDomain, TabTech} from './Tabs'
import {host} from '../lib_front'
import '../css/Report.css'


function AnalyzeResult(props){
    const [tech, setTech] = useState("")
    const [domain, setDomain] = useState("")
    const [dic, setDic] = useState("")
    const [serverInfor, setServerInfor] = useState("")
    const [dnsInfor, setDnsInfor] = useState("")


    useEffect(async ()=>{
        let {url,isAnalyze} = props.location.state
        console.log(url, isAnalyze)

        await getData(url,isAnalyze)
    },[])

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
            setTech(data.technologies)
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
            setDnsInfor(data)
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
    return(
        <div id="report">
            <Tabs>
    <TabList className="nav-report">
      <Tab>Technologies</Tab>
      <Tab>Domain</Tab>
      <Tab>Dictionary tree</Tab>
      <Tab>DNS</Tab>
      <Tab>Server</Tab>
    </TabList>

    <TabPanel>
        <TabTech tech={tech}/>
    </TabPanel>
    <TabPanel>
        <h2>{domain}</h2>
    </TabPanel>
    <TabPanel>
        <h2>{dic}</h2>
    </TabPanel>
    <TabPanel>
        <h2>{dnsInfor}</h2>
    </TabPanel>
    <TabPanel>
        <h2>{serverInfor}</h2>
    </TabPanel>
    </Tabs>
        </div>
    )
}

export default AnalyzeResult

{/* <div class="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
