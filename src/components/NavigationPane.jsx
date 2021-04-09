import React from 'react'
import "../css/Navigation.css"

function NavigationPane(){
    return(
    <div id="navigation" >
        <div className="layer">
            <h3><b>Enumtool</b></h3>
            <a href='/'><img src="/icons/website/house-user-solid.svg" />Home</a>
            <a href='/search_cve'><img src="/icons/website/search-solid.svg" />CVE search</a>
            <a href='/history'><img src="/icons/website/history-solid.svg" />History Report</a>
            <a href='/contact'><img src="/icons/website/id-card-regular.svg" />Contact</a>
            <a href='/about'><img src="/icons/website/envelope-open-text-solid.svg" />About us</a>
        </div> 
    </div>)
}

export default NavigationPane