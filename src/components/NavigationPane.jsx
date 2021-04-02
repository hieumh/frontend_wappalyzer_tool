import React from 'react'
import "../css/Navigation.css"

function NavigationPane(){
    return(
    <div id="navigation" >
        <h3>Enumtool</h3>
        <a href='/'>Home</a>
        <a href='/search_cve'>CVE search</a>
        <a href='/history'>History Report</a>
        <a href='/contact'>Contact</a>
        <a href='/about'>About us</a>
    </div>)
}

export default NavigationPane