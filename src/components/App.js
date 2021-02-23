import '../css/App.css'
import Layout from './Layout'
import Title from './Title'
import NavigationPane from './NavigationPane'
import {
  BrowserRouter as Router
} from "react-router-dom"


function App() {
  return (
    <Router>
      <div>
        <NavigationPane />
        <div style={{"marginLeft":"15%",'width':"85%"}}>
        <Title />
        <Layout />
        </div>
      </div>
    </Router>
  );
}

export default App
