import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import AuthModal from "./AuthModal.jsx";
import SendDefinitionModal from "./SendModal.jsx";


class App extends Component {
    constructor(){
    super();
    this.state = {
      one: true,
      lowerIcon: 'angle down',
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

    // close lower and change icon
    this.closeLower = () => {
      $('#lapiChromeExtensionContainer').remove();
    }
  // end constructor
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <AuthModal trigger={<button>Authenticate</button>}/>
          <SendDefinitionModal trigger={<button>Create API Endpoint</button>} address='localhost:4000'/>
          <Toolbar closeFunc={this.closeEx}/>
          <Lowerbar/>
        </div>
      </div>
    );
  }
}

export default App;
