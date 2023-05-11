import { useLocation } from 'react-router-dom';
import './App.css';
import {About, Detail, Form, Home, Landing} from './views';
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const location = useLocation();
  return (
    <div className="App">

    {location.pathname !== "/"  && <NavBar/>}
    <Route exact path="/" component={Landing}/>
    <Route exact path="/home" component={Home}/>
    <Route  path="/detail/:id" component={Detail}/>
    <Route exact path="/create" component={Form}/> 
    <Route exact path="/about" component={About}/>
    
      
      
    </div>
    
  );
}


export default App;