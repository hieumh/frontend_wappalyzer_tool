import React,{useState,useEffect} from 'react'
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs'
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

function TabDetail(props){    
    function handleClick(e){
        e.target.classList.toggle("active")
        let content = e.target.nextElementSibling
        while(content){
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
            if(!content){
                return
            }
            content = content.nextElementSibling

        }
    }
        
        
    return(
        <div style={{'marginTop':'30px','marginBottom':'30px'}}>
            <ul>
            <table id='history' style={{'marginLeft':'3px', 'marginRight':'3px'}}>
                <tbody>
                    <tr>
                        <th><img src={props.src} alt={props.website} width="30" height="30" /></th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Link</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{props.name}</td>
                        <td>{props.version}</td>
                        <td>{props.website}</td>
                    </tr>
                </tbody>
            </table>
                <li>
                <ul>
                <button onClick={handleClick} className='collapsible'>CVE of {props.name} ({props.cve.length} cves)</button>
                { props.cve.map(element =>{
                        return(
                        <li key={element.cve} className='content'>
                        <hr />
                            <p>CVE: {element.cve}</p>
                            <p>Year: {element.year}</p>
                            <p>Description: {element.desc}</p>
                        </li>)
                    })
                    }
                </ul>
                </li>
            </ul>
        </div>
    )
}

function TabTech(props){
    if(props.tech.length === 0) {
        return (
            <div >
                <p>We found nothing ... </p>
            </div>
        )
    }   
    return(<div >
        <ul>
            {props.tech.map((data)=>{
                let link = "/icons/" + data.icon
                let listCve = []
                if(data.cve){
                    for (const index in data.cve){
                        listCve.push(data.cve[index])
                    }
                    listCve=listCve.slice(0,10)
                }
                return (
                    <li key={data.name}>
                        <TabDetail key={data.name} src={link} name={data.name} website={data.website} confidence={data.confidence} version={data.version} cve={listCve} />
                    </li>
                ) 
                
            })}
            </ul>
        </div>
    )
}

function TabDomain(props){
    return(<div>Domain</div>)
}

function TabDic(props){
    return(<div>dictionary</div>)
}

function TabDNS(props){
    return(<div>DNS</div>)
}

function TabServer(props){
    return(<div>Server</div>)
}
{/* <div class="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
