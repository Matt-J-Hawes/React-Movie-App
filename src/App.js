//DEPENDENCIES
import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route} from 'react-router-dom'

//COMPONENTS
import Data from './components/Data'
import Movie from './components/Movie';
import './App.css';

const App = () => {
	  return (
	      <div className = 'app'>
	       <Router>	
	       <Switch>
		       <Route exact path = '/'>    
		         <Data />
		       </Route>
		        <Route path = '/:query'>
		          <Movie />
		        </Route>
	        </Switch>
	       </Router>
	      </div>
	  );
   };

export default App;
