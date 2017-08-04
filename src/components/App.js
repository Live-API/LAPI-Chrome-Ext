import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";


class App extends Component {
    constructor(){
    super();
    this.state = {
      active: false
    }

    // this.activateModal = () => {
    //   console.log("ji");
    //   this.setState({active: !this.state.active});
    // }

    // this.activateModal = this.activateModal.bind(this)
    this.closeEx = () => {
     $('#lapiChromeExtensionContainer').remove(); 
     $('body').css({
        '-ms-transform': 'translateY(0px)',
        '-webkit-transform': 'translateY(0px)',
        'transform': 'translateY(0px)'
    });
  }

  //   this.hideLow = () => {
  //     console.log("wi");
  //    $('#lapiChromeExtensionContainer').remove(); 
  // }

  // end constructor
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
           <Toolbar closeFunc={this.closeEx}/>
          <Lowerbar/> 
        </div>
      </div>
    );
  }
}

export default App;