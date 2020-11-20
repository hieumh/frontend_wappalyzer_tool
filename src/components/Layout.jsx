import React from 'react'
import Content from './Content'
import AnalyzeResult from "./AnalyzeResult";
import SearchCVE from "./SearchCVE"
import Contact from "./Contact"
import About from "./About"
import {
    Switch,
    Route
} from 'react-router-dom'


function Layout(){
    return(
        <Switch>
            <Route path='/' exact children={<Content />} />
            <Route path='/analyze_result' exact children={<AnalyzeResult />} />
            <Route path='/search_cve' exact children={<SearchCVE />} />
            <Route path='/contact' exact children={<Contact />} />
            <Route path='/about' exact children={<About />} />
        </Switch>
    )
}

export default Layout