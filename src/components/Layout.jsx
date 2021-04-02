import React from 'react'
import AnalyzeResult from "./AnalyzeResult"
import SearchCVE from "./SearchCVE"
import Contact from "./Contact"
import About from "./About"
import HistoryReport from './HistoryReport'
import Content from './Content'
import {
    Switch,
    Route
} from 'react-router-dom'
import LastReport from './LastReport'


function Layout(){
    return(
        <Switch>
            <Route path='/' exact children={<Content />} />
            <Route path='/analyze_result' render={(props) => <AnalyzeResult {...props}/>}  />
            <Route path='/search_cve' exact children={<SearchCVE />} />
            <Route path='/contact' exact children={<Contact />} />
            <Route path='/history' exact children={<HistoryReport /> } />
            <Route path='/about' exact children={<About />} />
        </Switch>
    )
}

export default Layout