import React from 'react'
import "../css/Navigation.css"

// function NavigationPane(){
//     return(
//     <div id="navigation" className="w3-sidebar w3-light-grey w3-bar-block" style={{'width':'15%','paddingLeft':'15px'}}>
//         <h3 className='w3-sidebar-item' style={{'paddingLeft':'15px'}}>Wappanlyzer</h3>
//         <a className='w3-bar-item w3-button' href='/'>Home</a>
//         <a className='w3-bar-item w3-button' href='/last_report'>Last Report</a>
//         <a className='w3-bar-item w3-button' href='/search_cve'>CVE search</a>
//         <a className='w3-bar-item w3-button' href='/history'>History Report</a>
//         <a className='w3-bar-item w3-button' href='/contact'>Contact</a>
//         <a className='w3-bar-item w3-button' href='/about'>About us</a>
//     </div>)
// }

function NavigationPane(){
    return(
    <div id="navigation" >
        <h3>Enumtool</h3>
        <a href='/'>Home</a>
        <a href='/last_report'>Last Report</a>
        <a href='/search_cve'>CVE search</a>
        <a href='/history'>History Report</a>
        <a href='/contact'>Contact</a>
        <a href='/about'>About us</a>
    </div>)
}

export default NavigationPane