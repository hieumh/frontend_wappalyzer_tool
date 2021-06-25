import React from 'react'
import AnalyzeResult from "./AnalyzeResult"
import Dashboard from "./Dashboard"
import SearchDatabase from "./Search"
import About from "./About"
import HistoryReport from './HistoryReport'
import Content from './Content'
import {
    Switch,
    Route
} from 'react-router-dom'


function Layout(){
    return(
        <Switch>
            <Route path='/' exact children={<Dashboard />} />
            <Route path='/analyze_page' children={<Content />} />
            <Route path='/analyze_result' render={(props) => <AnalyzeResult {...props}/>}  />
            <Route path='/search' exact children={<SearchDatabase />} />
            <Route path='/history' exact children={<HistoryReport /> } />
            <Route path='/about' exact children={<About />} />
        </Switch>
    )
}

export default Layout