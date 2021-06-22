import React from 'react'
import "../css/Navigation.css"

function NavigationPane(){
    return(
    <div id="navigation" >
        <div className="layer">
            <h3><b>Enumtool</b></h3>
            <a href='/'><img src="/icons/website/house-user-solid.svg" alt="home"/>Home</a>
            <a href='/analyze_page'><img src="/icons/website/terminal-solid.svg" alt="analyze"/>Analyze page</a>
            <a href='/search'><img src="/icons/website/search-solid_1.svg" alt="search"/>Search</a>
            <a href='/history'><img src="/icons/website/history-solid.svg" alt="history"/>History Report</a>
            <a href='/contact'><img src="/icons/website/id-card-regular.svg" alt="contact"/>Contact</a>
            <a href='/about'><img src="/icons/website/envelope-open-text-solid.svg" alt="about"/>About us</a>
        </div> 
    </div>)
}

export default NavigationPane