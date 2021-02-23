import React from 'react'
import '../css/Report.css'

function AnalyzeResult(props){

    if(props.location.state.tech.length === 0) {
        return (
            <div >
                <p>We found nothing ... </p>
            </div>
        )
    }    
    return(
        <div >
        <ul>
            {props.location.state.tech.map((data)=>{
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