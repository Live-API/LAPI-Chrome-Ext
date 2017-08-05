import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import Segment from "./Segment";
import AuthModal from "./AuthModal.jsx";
import SendDefinitionModal from "./SendModal.jsx";


class App extends Component {
    constructor(){
    super();
    this.state = {
      activeStep: 1,
      stepsCompleted: [],
      lowerBar: true,
      scrapePropNames: [],
      lowerSegment: false,
      segmentPropValue: '',
    }

    // move to next step
    this.stepForward = () => {
      console.log("step", this.state.activeStep);
      let step = this.state.activeStep;
      let completedArr = this.state.stepsCompleted;
      if (this.state.activeStep<=5){
        completedArr.push(step);
        this.setState({stepsCompleted: completedArr});
        (step === 1) ? this.setState({activeStep: 4}): this.setState({activeStep: ++step});
        console.log(this.state.stepsCompleted);
      } 
    }

    // deal with segment value
    this.handleChangeValue = (e) => this.setState({segmentPropValue: e.target.value});

    // save scrapePropNames
    this.saveScrapePropNames = () => {
      let newArr = this.state.scrapePropNames;
      newArr.push(this.state.segmentPropValue);
      this.setState({scrapePropNames: newArr});
      console.log(this.state.scrapePropNames)
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

    // toggle lowerbar transform
    this.lowerBarTransformCssToggle = () => {
      let pushDown = () => {
            $('body').css({
            '-ms-transform': 'translateY(165px)',
            '-webkit-transform': 'translateY(165px)',
            'transform': 'translateY(165px)'
        })
          $('#lapiChromeExtensionContainer').css({
          'top': '-165px'
        })
      }

      let pullUp = () => {
        console.log("pulling body up")
            $('body').css({
            '-ms-transform': 'translateY(35px)',
            '-webkit-transform': 'translateY(35px)',
            'transform': 'translateY(35px)'
        })

        $('#lapiChromeExtensionContainer').css({
          'top': '-35px'
        })
      }

      (!this.state.lowerBar) ? pushDown() : pullUp();
    }

    // close lower and change icon
    this.toggleLower = () => {
      this.setState({lowerBar: !this.state.lowerBar});
      this.lowerBarTransformCssToggle();
    }
  // end constructor
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

           <AuthModal trigger={<button>Authenticate</button>}/>
          <SendDefinitionModal trigger={<button>Create API Endpoint</button>} address='localhost:4000'/>
           <Toolbar closeFunc={this.closeEx} toggleLower={this.toggleLower} arrowDown={this.state.lowerBar}/>
          {this.state.lowerBar ? <Lowerbar activeStep={this.state.activeStep} stepsCompleted={this.state.stepsCompleted}/> : null}
          {this.state.lowerBar ? <Segment setValFunc={this.handleChangeValue} value={this.state.segmentPropValue} saveFunc={this.saveScrapePropNames} doneFunc={this.stepForward}/> : null}

        </div>
      </div>
    );
  }
}

export default App;
