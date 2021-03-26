import '../css/App.css'
import Layout from './Layout'
import Title from './Title'
import NavigationPane from './NavigationPane'
import '../css/Dashboard.css'
import {
  BrowserRouter as Router
} from "react-router-dom"


function App() {
  return (
    <Router>
      <div>
        <NavigationPane />
        <div id="dashboard">
        <Title />
        <Layout />
        </div>
      </div>
    </Router>
  );
}

export default App
