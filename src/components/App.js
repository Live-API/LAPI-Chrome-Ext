import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
           <Toolbar/>
          <Lowerbar/> 
        </div>
      </div>
    );
  }
}

export default App;
