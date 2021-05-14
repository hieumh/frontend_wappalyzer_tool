import React,{useEffect, useState} from 'react'
import {json2html} from '../lib_front'


function TechDetail(props){    
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
        <div id="tech-detail">
                {/* <img src={props.src} alt={props.website} width="30" height="30" /> */}
                <h4 className="name-tech">{props.name}</h4>
                <div className="body-tech">
                {props.version ? <div><b>Version</b>:<p>{props.version}</p></div> : <div></div> }
                {props.link || props.website ? <div><b>Link</b>:<p>{props.link} {props.website}</p></div> : <div></div> }
                {props.confidence ? <div><b>Confidence</b>:<p>{props.confidence}</p></div> : <div></div> }
                {props.description ? <div><b>Description</b>:<p>{props.description}</p></div> : <div></div> }
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
                </div>
        </div>
    )
}

 
function TabTech(props){
    const tools = ["wapp","netcraft","largeio","webtech","whatweb"]
    const [tech, setTech] = useState([])
    const [type, setType] = useState('wapp')

    useEffect(()=>{
        let index = tools.lastIndexOf(type)
        setTech(props.tech[index])
    },[props.tech,type,tools,])

    function handleTech(e){
        setType(e.target.id)
    }

    if(props.tech.length === 0) {
        return (
            <div >
                <p>We found nothing ... </p>
            </div>
        )
    }   
    return(<div id='techonologies' className="card-body">
        <div className='list-tools'>
            <button href="#" className="btn btn-light" onClick={handleTech} id="wapp">Wappalzyer</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="netcraft">Netcraft</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="largeio">Largeio</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="webtech">Webtech</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="whatweb">Whatweb</button>
        </div>
        <ul id="tab-detail">
            {tech.map((data)=>{
                let listCve = []
                if(data.cve){
                    for (const index in data.cve){
                        listCve.push(data.cve[index])
                    }
                    listCve=listCve.slice(0,10)
                }
                return (
                    <li key={data.name}>
                        <TechDetail key={data.name} name={data.name} website={data.website} confidence={data.confidence} version={data.version} cve={listCve} link={data.link} description={data.description}/>
                    </li>
                ) 
                
            })}
            </ul>
        </div>
    )
}

function TabDomain(props){
    const tools = ["whois","sublist3r"]
    const [domain, setDomain] = useState(props.domain[0])
    const [type, setType] = useState('whois')

    useEffect(()=>{
        // when change props.domain this will update base on current type
        let index = tools.lastIndexOf(type)
        setDomain(props.domain[index])
    },[props.domain,type])


    function handleDomain(e){
        let index = tools.lastIndexOf(e.target.id)
        setDomain(props.domain[index])
        setType(e.target.id)
    }

    // function showToolResult(params){
        
    // }

    return(<div id='domain' className="card-body">
        <div className='list-tools'>
            <button href="#" className="btn btn-light" onClick={handleDomain} id="whois">Whois</button>
            <button href="#" className="btn btn-light" onClick={handleDomain} id="sublist3r">Sublist3r</button>
        </div>
        {(()=>{
            switch(type){
                case "whois":
                    return (<div id="domain-whois">   
                <b>Domain name</b>:{domain.domain_name != null ? domain.domain_name.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Creation date</b>:{domain.creation_date != null ? domain.creation_date.map((ele,index)=>{
                    return <p key={index}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Dnssec</b>:{domain.dnssec != null ? domain.dnssec.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Email</b>: {domain.email != null ? domain.email.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Expiration date</b>:{domain.expiration_date != null ? domain.expiration_date.map((ele, index)=>{
                    return <p key={index}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Name server</b>: {domain.name_server != null ? domain.name_server.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Org</b>:{domain.org != null ? domain.org.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Referral url</b>:{domain.referral_url != null ? domain.referral_url.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Registrar</b>:{domain.registrar != null ? domain.registrar.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>State</b>:{domain.state != null ? domain.state.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Status</b>: {domain.status != null ? domain.status.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Updated date</b>: {domain.updated_date != null ? domain.updated_date.map((ele,index)=>{
                    return <p key={index}>{ele}</p>
                }): <p>unknown</p>}
                <br />
                <b>Whois server</b>:{domain.whois_server != null ? domain.whois_server.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Address</b>:{domain.address != null ? domain.address.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>City</b>:{domain.city != null ? domain.city.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Country</b>:{domain.country != null ? domain.country.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
                <br />
                <b>Zipcode</b>:{domain.zipcode != null ? domain.zipcode.map((ele)=>{
                    return <p key={ele}>{ele}</p>
                }) : <p>unknown</p>}
            </div>)
            case "sublist3r":   
                return(
                    <div id="domain-sublist3r">
                    { !domain ? <p></p> : domain.map((ele,index)=>{
                        return <p key={index}>{ele}</p>
                    })}
                    </div>
                )
            }
        })()}
    </div>)
}


function TabDic(props){
    function createTree(dic){
        let keys = Object.keys(dic)

        return keys.map(key =>{
                if(JSON.stringify(dic[key])==="{}"){
                    return (<li key={key}><img alt="file" src='/icons/website/sticky-note-regular.svg' />{" "+key}</li>)
                }
                else{
                    return(<li id={key} key={key}><img alt="folder" src='/icons/website/folder-solid.svg'/>{" "+key}<ul>{createTree(dic[key])}</ul></li>)
                }
        })
    }
    if(props.dic ===""){
        return(<div>Nothing here</div>)
    }

    return(<div id="dic" className="card-body">
            <div id="wappalyzer-link">
                <h3>Wappalyzer</h3> 
                <ul>{createTree(props.dic[0])}</ul>
            </div> 
            <hr /> 
            <div id="gobuster">
                <h3>Gobuster</h3>
                <ul>{!Array.isArray(props.dic[1]) ? <p></p> : props.dic[1].directories.map((ele,index)=>{
                    return <li key={index}><img alt="folder" src='/icons/website/folder-solid.svg'/>{" "+ele}</li>
                })}</ul>
                <ul>{!Array.isArray(props.dic[1]) ? <p></p> : props.dic[1].files.map((ele,index)=>{
                    return <li key={index}><img alt="file" src='/icons/website/sticky-note-regular.svg' />{" "+ele}</li>
                })}</ul>
            </div>
    </div>)
}

function TabDNS(props){
    const [option, setOption] = useState("A")

    function handleClick(e){
        setOption(e.target.innerHTML)
    }

    if(props.dns.length === 0){
        return(<div id="dns">Nothing here</div>)
    }
    return(<div id="dns" className="card-body">
        <div className="dns-options">
            <button onClick={handleClick}>A</button>
            <button onClick={handleClick}>AAAA</button>
            <button onClick={handleClick}>ANY</button>
            <button onClick={handleClick}>CAA</button>
            <button onClick={handleClick}>CNAME</button>
            <button onClick={handleClick}>MX</button>
            <button onClick={handleClick}>NS</button>
            <button onClick={handleClick}>PTR</button>
            <button onClick={handleClick}>SOA</button>
            <button onClick={handleClick}>SRV</button>
            <button onClick={handleClick}>TXT</button>
        </div>
        <div className="code">
        { props.dns[option].split("\n").map((ele,index)=>{
            return <p key={index}>{ele === "" ? "\t" : ele}</p>
        })}
        </div>
    </div>)
}

function TabServer(props){
    let nmap = !props.nmap ? "" : props.nmap.split("\n")
    
    return(<div id="server-network" className='card-body'>
        {nmap==="" ? <div></div> : <div className='code'>
            {nmap.map((ele,index)=>{
                return <p key={index}>{ele}</p>
            })}
        </div>}
    </div>)
}

function TabDetectWaf(props){
    let wafs = props.wafw00f.wafs ? props.wafw00f.wafs : []
    return(<div id="detect-firewall" className='card-body'>
            {
                wafs.map((ele,index)=>{
                    return(<div key={index}>
                        <b>Firewall:</b>
                        <p>{ele.firewall}</p>
                        <b>Manufacturer:</b>
                        <p>{ele.manufacturer}</p>
                        <hr />
                        </div>)
                })
            }
        </div>)
}

function TabScan(props){
    const tools = ["wpscan","droopescan","joomscan","nikto"]
    const [tool,setTool] = useState([])
    const [type, setType] = useState("wpscan")
    let _type = type 
    useEffect(()=>{
        // set type scan-content when loading
        _type = type
        let index = tools.lastIndexOf(_type)
        setTool(props.scans[index])
    },[props.scans,type])

    function handleScan(e){
        setType(e.target.id)
    }


    return(<div id="scans" className='card-body'>
        <div className='list-tools'>
            <button href="#" className="btn btn-light" onClick={handleScan} id="wpscan">Wpscan</button>
            <button href="#" className="btn btn-light" onClick={handleScan} id="droopescan">Droopescan</button>
            <button href="#" className="btn btn-light" onClick={handleScan} id="joomscan">Joomscan</button>
            <button href="#" className="btn btn-light" onClick={handleScan} id="nikto">Nikto</button>
        </div>
        <div className="scan-content">
            {_type === "joomscan" ? <div>{
                tool === "" || typeof tool !== "string" ? <div></div> : <div>{tool.split('\n').map(ele=>{
                    return <p>{ele}</p>
                })}</div>}</div>: <div>{json2html(tool,1)}</div>}
        </div>
    </div>)
}


export {
    TabTech,
    TabDomain,
    TabDic,
    TabDNS,
    TabServer,
    TabDetectWaf,
    TabScan
}