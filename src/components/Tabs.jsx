import React,{useEffect, useState} from 'react'

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
    const [tech, setTech] = useState([])
    const [type, setType] = useState('wapp')

    useEffect(()=>{
        switch(type){
            case "wapp":
                setTech(props.tech[0])
                break
            case "netcraft":
                setTech(props.tech[1])
                break
            default:
                setTech(props.tech[2])
        }
    },[props.tech])

    function handleTech(e){
        switch(e.target.id){
            case "wapp":
                setType("wapp")
                setTech(props.tech[0])
                break
            case "netcraft":
                setType("netcraft")
                setTech(props.tech[1])
                break
            default:
                setType("largeio")
                setTech(props.tech[2])
        }
    }

    if(props.tech.length === 0) {
        return (
            <div >
                <p>We found nothing ... </p>
            </div>
        )
    }   
    return(<div >
        <div id='list-tools'>
            <h3>Tools</h3>
            <button href="#" className="btn btn-light" onClick={handleTech} id="wapp">Wappalzyer</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="netcraft">Netcraft</button>
            <button href="#" className="btn btn-light" onClick={handleTech} id="largeio">Largeio</button>
        </div>
        <ul id="tab-detail">
            {tech.map((data)=>{
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
                        <TechDetail key={data.name} src={link} name={data.name} website={data.website} confidence={data.confidence} version={data.version} cve={listCve} />
                    </li>
                ) 
                
            })}
            </ul>
        </div>
    )
}

function TabDomain(props){

    return(<div id="domain">
        <h2>Domain information</h2>

        <b>Domain name</b>:{props.domain.domain_name != null ? <p>{props.domain.domain_name.reduce((result,ele)=>{
            return result+", "+ele
        })}</p> : <p>unknown</p>}
        <br />
        <b>Creation date</b>:{props.domain.creation_date != null ? <p>{props.domain.creation_date}</p> : <p>unknown</p>}
        <br />
        <b>Dnssec</b>{props.domain.dnssec != null ? <p>{props.domain.dnssec.reduce((result,ele)=>{
            return result+", "+ele
        })}</p> : <p>unknown</p>}
        <br />
        <b>Email</b>: {props.domain.email != null ? <p>{props.domain.email.reduce((result,ele)=>{
            return result+", "+ele
        })}</p> : <p>unknown</p>}
        <br />
        <b>Expiration date</b>:{props.domain.expiration_date != null ? <p>{props.domain.expiration_date}</p> : <p>unknown</p>}
        <br />
        <b>Name server</b>: {props.domain.name_server != null ? <p>{props.domain.name_server.reduce((result,ele)=>{
            return result+", "+ele
        })}</p> : <p>unknown</p>}
        <br />
        <b>Org</b>:{props.domain.org != null ? <p>{props.domain.org}</p> : <p>unknown</p>}
        <br />
        <b>Referral url</b>:{props.domain.referral_url != null ? <p>{props.domain.referral_url}</p> : <p>unknown</p>}
        <br />
        <b>Registrar</b>:{props.domain.registrar != null ? <p>{props.domain.registrar}</p> : <p>unknown</p>}
        <br />
        <b>State</b>:{props.domain.state != null ? <p>{props.domain.state}</p> : <p>unknown</p>}
        <br />

        <b>Status</b>: {props.domain.status != null ? props.domain.status.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Updated date</b>: {props.domain.updated_date != null ? props.domain.updated_date.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }): <p>unknown</p>}
        <br />
        <b>Whois server</b>:{props.domain.whois_server != null ? <p>{props.domain.whois_server}</p> : <p>unknown</p>}
        <br />
        <b>Address</b>:{props.domain.address != null ? <p>{props.domain.address}</p> : <p>unknown</p>}
        <br />
        <b>City</b>:{props.domain.city != null ? <p>{props.domain.city}</p> : <p>unknown</p>}
        <br />
        <b>Country</b>:{props.domain.country != null ? <p>{props.domain.country}</p> : <p>unknown</p>}
        <br />
        <b>Zipcode</b>:{props.domain.zipcode != null ? <p>{props.domain.zipcode}</p> : <p>unknown</p>}
    </div>)
}

function TabDic(props){

    function createTree(dic){
        let keys = Object.keys(dic)

        return keys.map(key =>{
                if(JSON.stringify(dic[key])=="{}"){
                    return (<li key={key}><img src='/icons/website/sticky-note-regular.svg' />{" "+key}</li>)
                }
                else{
                    return(<li id={key} key={key}><img src='/icons/website/folder-solid.svg'/>{" "+key}<ul>{createTree(dic[key])}</ul></li>)
                }
        })
    }
    if(props.dic ===""){
        return(<div>Nothing here</div>)
    }

    return(<div id="dic">
            <ul>{createTree(props.dic)}</ul>
    </div>)
}

function TabDNS(props){
    if(props.dns.length ===0){
        return(<div id="dns"></div>)
    }
    return(<div id="dns">
        {props.dns.map((ele,index)=>{
            return <p key={index}>{ele}</p>
        })}
    </div>)
}

function TabServer(props){
    return(<div>Server</div>)
}


export {
    TabTech,
    TabDomain,
    TabDic,
    TabDNS,
    TabServer
}