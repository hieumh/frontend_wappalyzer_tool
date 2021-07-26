import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Report from './pages/Report'
import NavigationPane from './pages/Navigation'
import Title from './pages/Title'
import routes from './pages/routes'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact children={<Report />} path="/report" />
                <Route>
                    <NavigationPane />
                    <div id="dashboard">
                        <Title />
                        <Switch>
                            {routes.map(({ component, path, ...rest }) => {
                                return <Route exact children={component} key={path} {...rest} />
                            })}
                        </Switch>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default App