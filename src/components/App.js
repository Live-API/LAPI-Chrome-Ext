import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import SegmentOne from "./SegmentOne";
import SegmentFour from "./SegmentFour";
import SegmentFive from "./SegmentFive";
// import AuthModal from "./AuthModal.jsx";
// import SendDefinitionModal from "./SendModal.jsx";


$.fn.fullSelector = function () {
    // returns an array of DOM path
    var path = this.parents().addBack();
    // add parents
    // adds the child, reverses order of the parents (?)
    var quickCss = path.get().map(function (item) {
        // add class, id, index
        var self = $(item),
            id = item.id ? '#' + item.id : '',
            // gets all the classes for an item, and chains them together
            clss = item.classList.length ? item.classList.toString().split(' ').map(function (c) {
                return '.' + c;
            }).join('') : '',
            name = item.nodeName.toLowerCase(),
            index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : '';
        // Check if the name is html or body, which are returned immediately
        if (name === 'html' || name === 'body') {
            return name;
        }
        // Other elements are returned with their index, id, and classes
        return name + index + id + clss;
    // Shows parent-child relationship
    }).join('>');
    return quickCss;
};

function cleanWhiteSpace(text) {
  // Remove whitespace before or after text
  let revisedText = text.replace(/^\s+|\s+$/, "");
  // Remove extra spaces between words
  revisedText = revisedText.replace(/\s\s+/g, " ");
  return revisedText;
}

function cumulativeOffset(element) {
  let top = 0
  let left = 0;
  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top + 165,
    left: left
  };
};

class App extends Component {
    constructor(){
    super();
    this.state = {
      activeStep: 1,
      stepsCompleted: [],
      lowerBar: true,
      // scrapePropNames: [],
      lowerSegment: false,
      // segmentPropValue: '', 
      property: undefined,
      propertyArray: []
    }
    this.text = {};
    this.getPropertyName = this.getPropertyName.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.resetPropertyName = this.resetPropertyName.bind(this);

    // this.activateModal = () => {
    //   console.log("ji");
    //   this.setState({active: !this.state.active});
    // }

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

    // save scrapePropNames
    // this.saveScrapePropNames = () => {
    //   let newArr = this.state.scrapePropNames;
    //   newArr.push(this.state.segmentPropValue);
    //   this.setState({scrapePropNames: newArr});
    //   console.log(this.state.scrapePropNames)
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
  // Gets property name when entered

  // Gets value of the property textbox
  getPropertyName(e) {
    this.setState({property: e.target.value});
    console.log('this.property', this.state.property);
  }

  // Clears the property textbox. Executed in saveProperty function
  resetPropertyName() {
    const propertyTextbox = document.getElementById('live-API-property-textbox');
    propertyTextbox.value = '';
    this.setState({property: undefined});
    // target the id element
    // reset its value
    // reset this.property to undefined
  }
  // In Step 1, click the save button to add property to this.text object
  // and clear the textbox
  saveProperty(property) {
    console.log('hi');
    console.log('property', property);
    if (!property) return;
    this.text[property] = this.state.propertyArray;
    console.log('this.text', this.text);
    this.resetPropertyName();
  }


  /*
  Experiencing Problems Here
  */

  componentDidMount() {
    const Application = this;

    // Event listener to prevent population of new highlight div on existing highlight div
    $(document).on('click','*', function(){
        return false;
    });

    $(document).on('click', '.liveAPI-highlight', function(e) {
      e.stopImmediatePropagation();
    });

    $(document).on('click', '.liveAPI-highlight-wrapper', function(e) {
      e.stopImmediatePropagation();
    });

    $(document).on('click', '.liveAPI-highlight-button', function(e) {
      console.log('propertyArray', Application.state.propertyArray);
      // When the item is deselected, remove DOMPath from the currentArray
      const propertyArray = Application.state.propertyArray.slice();
      let currDOMPath = $(this).parent().data('DOMPath');
      let index = propertyArray.indexOf(currDOMPath);
      propertyArray.splice(index, 1);
      Application.setState({"propertyArray": propertyArray});
      $(this).parent().remove();
      // prevents other listeners of the same event from being called
      e.stopImmediatePropagation();
    })

    // #lapiChromeExtensionContainer

    $(document).on('click', '*', function() {
      let children = $(this).children().map((i, ele) => {
        return ele.nodeName.toLowerCase();
      }).get();
      let path = $(this).parents().addBack().get().map((ele, i) => {
        return ele.id;
      })
      if ($(this)[0].nodeName.toLowerCase() === 'div' && children.includes('div')) return false;
      if (path.includes('lapiChromeExtensionContainer')) return false;
      let styles = $(this).css([
        "width", "height", "font-size", "font-weight", "font-family", "font-variant", "font-stretch", "line-height", "text-transform", "text-align", "padding-top", "padding-bottom", "padding-left", "padding-right", "letter-spacing"]
      );
      
      const position = cumulativeOffset(this);
      const DOMPath = $(this).fullSelector();
      // Add DOM Path to this.state.propertyArray
      const propertyArray = Application.state.propertyArray.slice();
      propertyArray.push(DOMPath);
      Application.setState({"propertyArray": propertyArray});
      $('#lapiChromeExtensionContainer').append(
        $('<div/>')
        .offset({top: position.top, left: position.left})

        // Assign div element the CSS properties of the HTML Element
        .css({"font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"]})
        // Add DOM Path to the parent div element
        .data('DOMPath', DOMPath)
        // Add highlight and ignore classes
        // Add highlight and ignore classes
        .addClass('liveAPI-highlight liveAPI-yellow liveAPI-ignore')
        .append(
          $('<div/>')
          .addClass('liveAPI-highlight-wrapper liveAPI-ignore')
          .css({
            "max-width": styles["width"], "height": styles["height"],"padding-right": styles["padding-right"]
          })
          // .text(cleanWhiteSpace($(this).getText()))
          .text(cleanWhiteSpace($(this).text()))
        )
        .append(
          $('<a/>')
          .addClass('liveAPI-highlight-button')
          .text('x')
        )
      );
      console.log(Application.state.propertyArray);
      // console.log(cleanWhiteSpace($(this).text()));
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

           {/* <AuthModal trigger={<button>Authenticate</button>}/>
          <SendDefinitionModal trigger={<button>Create API Endpoint</button>} address='localhost:4000'/> */}
           <Toolbar closeFunc={this.closeEx} toggleLower={this.toggleLower} arrowDown={this.state.lowerBar}/>

          {this.state.lowerBar ? <Lowerbar activeStep={this.state.activeStep} stepsCompleted={this.state.stepsCompleted}/> : null}

{/* setValFunc={this.handleChangeValue} value={this.state.segmentPropValue} saveFunc={this.saveScrapePropNames}  */}
          {(this.state.lowerBar && (this.state.activeStep===1)) ? <SegmentOne doneFunc={this.stepForward} getPropertyName={this.getPropertyName} property={this.state.property} saveProperty={this.saveProperty}/> : null}

           {(this.state.lowerBar && (this.state.activeStep===4)) ? <SegmentFour doneFunc={this.stepForward}/> : null}

            {(this.state.lowerBar && (this.state.activeStep===5)) ? <SegmentFive doneFunc={this.stepForward}/> : null}


        </div>
      </div>
    );
  }
}

export default App;
