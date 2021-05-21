import '../css/App.css'
import Layout from './Layout'
import Title from './Title'
import NavigationPane from './NavigationPane'
import Report from './Report'
import '../css/Dashboard.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/report" exact children={<Report />} />
        <Route>
          <div>
            <NavigationPane />
            <div id="dashboard">
            <Title />
            <Layout />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App
