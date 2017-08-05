import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import Segment from "./Segment";


class App extends Component {
    constructor(){
    super();
    this.state = {
      activeStep: 0,
      lowerBar: true,
      scrapePropNames: [],
      lowerSegment: false,
      segmentPropValue: '',
    }

    // move to next step
    this.stepForward = () => {
      console.log("step", this.state.activeStep);
      if (this.state.activeStep<5){
      this.setState({activeStep: this.state.activeStep++});
      }
    }

    // deal with segment value
    this.handleChangeValue = (e) => this.setState({segmentPropValue: e.target.value});

    // save scrapePropNames
    this.saveScrapePropNames = () => {
      let newArr = this.state.scrapePropNames;
      newArr.push(this.state.segmentPropValue);
      this.setState({scrapePropNames: newArr});
    }

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
    this.toggleLower = () => {
      this.setState({lowerBar: !this.state.lowerBar});
    }
  // end constructor
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
           <Toolbar closeFunc={this.closeEx} toggleLower={this.toggleLower}/>
          {this.state.lowerBar ? <Lowerbar /> : null}
          {this.state.lowerBar ? <Segment setValFunc={this.handleChangeValue} value={this.state.segmentPropValue} saveFunc={this.saveScrapePropNames}/> : null}
        </div>
      </div>
    );
  }
}

export default App;
