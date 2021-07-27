import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Report from './pages/Report'
import NavigationPane from './pages/Navigation'
import Title from './pages/Title'
import routes from './pages/routes'
import './css/Dashboard.css'

function App() {
    console.log(routes)
    return (
        <Router>
            <Switch>
                <Route exact children={<Report />} path="/report" />
                <Route>
                    <NavigationPane />
                    <div id="dashboard">
                        <Title />
                        <Switch>
                            {routes.map(({ component:Component, path, ...rest }) => {
                                return <Route exact render={(props)=>{
                                    return <React.Suspense fallback={"loading..."}>
                                        <Component {...props} />
                                    </React.Suspense>
                                }} key={path} path={path} {...rest} />
                            })}
                        </Switch>
                    </div>
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default App