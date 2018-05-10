import React, {Component} from 'react';
import logo from './logo.svg';
import Currency from './First/First.js';
import Currency2 from './Second/Second.js';
import Currency3 from './Third/Third.js';
import Currency4 from './Fourth/Fourth.js';
import './App.css';

class App extends Component {
  render() {  
    return ( 
      <div className="App">
        <header className="App-header">
         </header>
        <div>
          <Currency/>
           <Currency2/> 
           <Currency3/> 
           <Currency4/> 
        </div> 
      </div>
    );
  }
}
  
export default App;
