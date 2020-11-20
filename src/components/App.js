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
      <Title />
      <div className='row'>
        <NavigationPane />
        <Layout />
      </div>
    </Router>
  );
}

export default App;
