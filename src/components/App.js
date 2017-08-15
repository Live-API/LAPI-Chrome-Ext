import React, { Component } from 'react';;
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import SegmentOne from "./SegmentOne";
import SegmentFour from "./SegmentFour";
import SegmentFive from "./SegmentFive";

$.fn.getDOMPath = function () {
  let DOMPath = path.get().map(item => {
    let self = $(item);
    let name = item.nodeName.toLowerCase();
    let index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : "";
    if (name === 'html' || name === 'body') return name;
    return name + index;
  });
  return DOMPath;
}

// Iterates through the DOM Path of an element, and gets (1) the least # of selectors to get the exact item, (2) path for common elements

// If commonPath is empty, then there are no common elements
// Returns an Array [uniquePath, commonPath]


$.fn.getSelectors = function(getDOMPath) {
  let DOMPath = $(this).getDOMPath().reverse();
  let i = 0;
  let commonPath;
  while (i < DOMPath.length) {
    let currElement = DOMPath.slice(0, i + 1);
    let cssSelectors = currElement.reverse().join(' > ')
    let result = $(cssSelectors);
    if (result.length === 1) return [cssSelectors, commonPath];
    commonPath = cssSelectors.slice();
    i++;
  }
}

/*            Comment Out                */

// $.fn.fullSelector = function () {
//     // returns an array of DOM path
//     var path = this.parents().addBack();
//     // add parents
//     // adds the child, reverses order of the parents (?)
//     var quickCss = path.get().map(function (item) {
//         // add class, id, index
//         var self = $(item),
//             id = item.id ? '#' + item.id : '',
//             // gets all the classes for an item, and chains them together
//             // remove leading, trailing, and excess white space
//             classes = item.classList.toString();
//             classes = classes.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ")
//             var clss = classes.length ? classes.split(' ').map(function (c) {
//                 return '.' + c;
//             }).join('') : '',
//             name = item.nodeName.toLowerCase(),
//             index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : '';
//         // Check if the name is html or body, which are returned immediately
//         if (name === 'html' || name === 'body') {
//             return name;
//         }
//         // Other elements are returned with their index, id, and classes
//         return name + index + id + clss;
//     // Shows parent-child relationship
//     }).join(' > ');
//     return quickCss;
// };

// Removes leading, trailing, and excess whitespace between words from text
function cleanWhiteSpace(text) {
  let revisedText = text.replace(/^\s+|\s+$/g, "").replace(/\s\s+/g, " ");
  return revisedText;
}

// Finds position of selected HTML element
function cumulativeOffset(element) {
  let top = 0
  let left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top + 230,
    left: left
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverUrl: '',
      crawlUrl: '',
      activeStep: 1,
      authenticated: false,
      authAttemptNum: 0,
      stepsCompleted: [],
      lowerBar: true,
      scrapePropBtnArr: [],
      lowerSegment: false,
      property: undefined,
      propertyArray: [],
      recommendations: [],
      text: {}
    }

    // toggle authentication 
    this.signIn = () => {
      console.log(this);
      this.setState({ authenticated: true });
      console.log("authenticated:", this.state.authenticated)
    }

    // initialize new crawl for already logged in user
    this.initializeNewCrawl = () => {
      this.setState({
        activeStep: 1,
        authAttemptNum: 0,
        stepsCompleted: [],
        property: undefined,
        propertyArray: []
      })
    }

    this.jumpBack = (activeStepInt) => {
      this.setState({ activeStep: activeStepInt });
    }

    // remove property
    this.removeProperty = (e, el) => {
      let propArr = this.state.scrapePropBtnArr;
      console.log("propArr", propArr);
      propArr.forEach((element, i) => {
        console.log("i", i);
        if (element === el.content) {
          propArr.splice(i, 1);
          console.log("HEY", propArr)
          this.setState({ scrapePropBtnArr: propArr });
          this.deleteProperty(el.content); // from text obj
          console.log(this.text)
        }
      });
    }

    // log user out
    this.logout = () => {
      this.setState({
        activeStep: 1,
        authenticated: false,
        authAttemptNum: 0,
        stepsCompleted: [],
        property: undefined,
        propertyArray: []
      })
    }

    // increment auth attempts
    this.authAttemptedFunc = () => {
      let attempt = this.state.authAttemptNum;
      ++attempt
      this.setState({ authAttemptNum: attempt });
      console.log("attempt", this.state.authAttemptNum);
      console.log("attempt from state", this.state.authAttemptNum);
    }

    // move to next step
    this.stepForward = () => {
      console.log("step", this.state.activeStep);
      let step = this.state.activeStep;
      let completedArr = this.state.stepsCompleted;
      if (this.state.activeStep <= 5) {
        completedArr.push(step);
        this.setState({ stepsCompleted: completedArr });
        (step === 1) ? this.setState({ activeStep: 4 }) : this.setState({ activeStep: ++step });
        console.log(this.state.stepsCompleted);
      }
    }

    this.closeEx = () => {
      $('#lapiChromeExtensionContainer').remove();
      $('#targetBodyContainer').css({
        '-ms-transform': 'translateY(0px)',
        '-webkit-transform': 'translateY(0px)',
        'transform': 'translateY(0px)'
      });
    }

    // toggle lowerbar transform
    this.lowerBarTransformCssToggle = () => {
      let pushDown = () => {
        $('#targetBodyContainer').css({
          '-ms-transform': 'translateY(230px)',
          '-webkit-transform': 'translateY(230px)',
          'transform': 'translateY(230px)'
        })
      }

      let pullUp = () => {
        console.log("pulling body up")
        $('#targetBodyContainer').css({
          '-ms-transform': 'translateY(35px)',
          '-webkit-transform': 'translateY(35px)',
          'transform': 'translateY(35px)'
        })
      }

      (!this.state.lowerBar) ? pushDown() : pullUp();
    }


    // close lower and change icon
    this.toggleLower = () => {
      this.setState({ lowerBar: !this.state.lowerBar });
      this.lowerBarTransformCssToggle();
    }

    this.savePostURL = (url) => {
      this.setState({ serverUrl: url })
    }

    /* 
      Following functions are used in Step 1 to assign property name to the selected HTML elements.
  
      getPropertyName - gets value of textbox
      resetPropertyName - resets value of textbox after saving
      saveProperty - saves property name to state
    */

    // Gets value of the property textbox
    this.getPropertyName = (e) => {
      this.setState({ property: e.target.value });
    }

    // Clears the property textbox. Executed in saveProperty function
    this.resetPropertyName = () => {
      const propertyTextbox = document.getElementById('live-API-property-textbox');
      propertyTextbox.value = '';
      this.setState({ property: undefined });
    }

    this.resetPropertyArray = () => {
      this.setState({ propertyArray: [] });
    }

    this.resetHighlightedElements = () => {
      // Not sure why body is firing twice
      console.log('body', $('body'));
      $('body').find('.liveAPI-newElement').remove();
    }

    this.saveProperty = (property) => {
      if (!property) return;
      let textObj = JSON.parse(JSON.stringify(this.state.text));
      textObj[property] = this.state.propertyArray.slice();
      this.setState({ text: textObj });
      
      // MELISSSA
      let newArr = this.state.scrapePropBtnArr;
      newArr.push(property);
      this.setState({
        property: property,
        scrapePropBtnArr: newArr
      });
      this.resetHighlightedElements();
      this.resetPropertyName();
      this.resetPropertyArray();
    }

    // Delete property from text object
    this.deleteProperty = (property) => {
      if (!property) return;
      let textObj = JSON.parse(JSON.stringify(this.state.text));
      delete textObj[property];
      this.setState({ text: textObj });
    }

    this.setCrawlUrl = (url) => {
      this.setState({ crawlUrl: url });
    }
    // end constructor /////////////////////////////////////
  }


  componentDidMount() {
    const Application = this;

    // Prevents default click event
    $(document).on('click', '*', function () {
      return false;
    });
    // Stop propagation for highlight components

    $(document).on('click', '.liveAPI-highlight', (e) => e.stopImmediatePropagation());
    $(document).on('click', '.liveAPI-highlight-wrapper', (e) => e.stopImmediatePropagation());
    // DOMPath is removed from state when item is deselected
    $(document).on('click', '.liveAPI-highlight-button', function (e) {
      const propertyArray = Application.state.propertyArray.slice();
      let currDOMPath = $(this).parent().data('DOMPath');
      let index = propertyArray.indexOf(currDOMPath);
      propertyArray.splice(index, 1);
      Application.setState({ "propertyArray": propertyArray });
      $(this).parent().remove();
      e.stopImmediatePropagation();
    });

    /*
    Return false when the element is part of the Toolbar
    Return false for creation of multiple highlighting
    Return false if the element is not a
      div, span, li, p element
    Add logic for div elements
    */

    $(document).on('click', '*', function () {
      const position = cumulativeOffset(this);
      const DOMPath = $(this).getSelectors($(this).getDOMPath)[0];
      // Remove event listener from Toolbar elements
      if ($(this).closest('#lapiChromeExtensionContainer').length === 1) return false;
      // Add DOM Path to this.state.propertyArray
      const propertyArray = Application.state.propertyArray.slice();
      propertyArray.push(DOMPath);
      Application.setState({ "propertyArray": propertyArray });
      let styles = $(this).css([
        "width", "height", "font-size", "font-weight", "font-family", "font-variant", "font-stretch", "line-height", "text-transform", "text-align", "padding-top", "padding-bottom", "padding-left", "padding-right", "letter-spacing"]
      );
      $('body').append(
        $('<div/>')
          .offset({ top: position.top, left: position.left })

          // Assign div element the CSS properties of the HTML Element
          .css({ "font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"] })
          // Add DOM Path to the parent div element
          .data('DOMPath', DOMPath)
          // Add highlight and ignore classes
          // Add highlight and ignore classes
          .addClass('liveAPI-newElement liveAPI-highlight liveAPI-yellow liveAPI-ignore')
          .append(
          $('<div/>')
            .addClass('liveAPI-highlight-wrapper liveAPI-ignore')
            .css({
              "max-width": styles["width"], "height": styles["height"], "padding-right": styles["padding-right"]
            })
            .text(cleanWhiteSpace($(this).text()))
          )
          .append(
          $('<a/>')
            .addClass('liveAPI-highlight-button')
            .text('x')
          )
      );
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          {/* <AuthModal trigger={<button>Authenticate</button>}/>
          <SendDefinitionModal trigger={<button>Create API Endpoint</button>} address='localhost:4000'/> */}
          <Toolbar closeFunc={this.closeEx} toggleLower={this.toggleLower} arrowDown={this.state.lowerBar} />

          {this.state.lowerBar ? <Lowerbar activeStep={this.state.activeStep} stepsCompleted={this.state.stepsCompleted} jumpBack={this.jumpBack} /> : null}


          {/* setValFunc={this.handleChangeValue} value={this.state.segmentPropValue} saveFunc={this.saveScrapePropNames}  */}

          {(this.state.lowerBar && (this.state.activeStep === 1)) ? <SegmentOne text={this.state.text} doneFunc={this.stepForward} getPropertyName={this.getPropertyName} property={this.state.property} saveProperty={this.saveProperty} setCrawlUrl={this.setCrawlUrl} scrapePropBtnArr={this.state.scrapePropBtnArr} removeProperty={this.removeProperty} selPropArr={this.state.propertyArray} /> : null}

          {/* {(this.state.lowerBar && (this.state.activeStep===4)) ? <SegmentFour saveURL={this.saveURL} doneFunc={this.stepForward} signIn={this.signIn} authed={this.state.authenticated} authAttemptedFunc={this.authAttemptedFunc} authAttemptedNum={this.state.authAttemptNum} logout={this.logout}/> : null} */}


          {(this.state.lowerBar && (this.state.activeStep === 4)) ? <SegmentFour savePostURL={this.savePostURL} doneFunc={this.stepForward} signIn={this.signIn} authed={this.state.authenticated} authAttemptedFunc={this.authAttemptedFunc} authAttemptedNum={this.state.authAttemptNum} logout={this.logout} /> : null}

          {(this.state.lowerBar && ((this.state.activeStep === 5) || (this.state.activeStep === 6))) ? <SegmentFive doneFunc={this.stepForward} text={this.state.text} activeStep={this.state.activeStep} crawlUrl={this.state.crawlUrl} serverUrl={this.state.serverUrl} initializeNewCrawl={this.initializeNewCrawl} /> : null}

        </div>
      </div>
    );
  }
}

export default App;
