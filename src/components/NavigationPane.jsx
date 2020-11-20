import React from 'react'
import '../css/Navigation.css'

function NavigationPane(){
     
    return(
    <nav id="navigation" className="nav navbar-light bg-light col-2">
    <div>
    <ul>
        <li><a className='link' href='/'>Home</a></li>
        <li><a className='link' href='/analyze_result'>Analyze result</a></li>
        <li><a className='link' href='/search_cve'>CVE search</a></li>
        <li><a className='link' href='/contact'>Contact</a></li>
        <li><a className='link' href='/about'>About us</a></li>
    </ul>
    </div>
    </nav>)
}

export default NavigationPane