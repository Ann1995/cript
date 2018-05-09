import React, {Component} from 'react';
import logo from './logo.svg';
import Currency from './First/First.js';
import Currency2 from './Second/Second.js';
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
        </div> 
      </div>
    );
  }
}
  
export default App;
