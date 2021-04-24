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
    return(<div id='techonologies' className="card-body">
        <div id='list-tools'>
            <h4>Tools</h4>
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
                        <TechDetail key={data.name} name={data.name} website={data.website} confidence={data.confidence} version={data.version} cve={listCve} link={data.link} description={data.description}/>
                    </li>
                ) 
                
            })}
            </ul>
        </div>
    )
}

function TabDomain(props){

    return(<div id="domain" className="card-body">
        <b>Domain name</b>:{props.domain.domain_name != null ? props.domain.domain_name.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Creation date</b>:{props.domain.creation_date != null ? props.domain.creation_date.map((ele,index)=>{
            return <p key={index}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Dnssec</b>:{props.domain.dnssec != null ? props.domain.dnssec.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Email</b>: {props.domain.email != null ? props.domain.email.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Expiration date</b>:{props.domain.expiration_date != null ? props.domain.expiration_date.map((ele, index)=>{
            return <p key={index}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Name server</b>: {props.domain.name_server != null ? props.domain.name_server.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Org</b>:{props.domain.org != null ? props.domain.org.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Referral url</b>:{props.domain.referral_url != null ? props.domain.referral_url.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Registrar</b>:{props.domain.registrar != null ? props.domain.registrar.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>State</b>:{props.domain.state != null ? props.domain.state.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Status</b>: {props.domain.status != null ? props.domain.status.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Updated date</b>: {props.domain.updated_date != null ? props.domain.updated_date.map((ele,index)=>{
            return <p key={index}>{ele}</p>
        }): <p>unknown</p>}
        <br />
        <b>Whois server</b>:{props.domain.whois_server != null ? props.domain.whois_server.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Address</b>:{props.domain.address != null ? props.domain.address.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>City</b>:{props.domain.city != null ? props.domain.city.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Country</b>:{props.domain.country != null ? props.domain.country.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
        <br />
        <b>Zipcode</b>:{props.domain.zipcode != null ? props.domain.zipcode.map((ele)=>{
            return <p key={ele}>{ele}</p>
        }) : <p>unknown</p>}
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

    return(<div id="dic" className="card-body">
            <ul>{createTree(props.dic)}</ul>
    </div>)
}

function TabDNS(props){

    const [option, setOption] = useState("A")

    function handleClick(e){
        setOption(e.target.innerHTML)
    }
    

    function showResult(){
        console.log("hhh" ,props.dns[option])
        return props.dns[option].map(ele=>{
            return <p key={ele}>{ele}</p>
        })
    }

    if(props.dns.length === 0){
        return(<div id="dns">Nothing here</div>)
    }
    return(<div id="dns" className="card-body">
        <div className="dns-options">
            <button onClick={handleClick}>A</button>
            {/* <button onClick={handleClick}>AAAA</button>
            <button onClick={handleClick}>ANY</button>
            <button onClick={handleClick}>CAA</button>
            <button onClick={handleClick}>CNAME</button> */}
            <button onClick={handleClick}>MX</button>
            <button onClick={handleClick}>NS</button>
            {/* <button onClick={handleClick}>PTR</button> */}
            <button onClick={handleClick}>SOA</button>
            {/* <button onClick={handleClick}>SRV</button> */}
            <button onClick={handleClick}>TXT</button>
        </div>
        <div className="code">
        {showResult()}
        </div>
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