import React, { Component } from 'react';;
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import SegmentOne from "./SegmentOne";
import SegmentFour from "./SegmentFour";
import SegmentFive from "./SegmentFive";
import Loader from "./Loader";

$.fn.getDOMPath = function () {
  let path = this.parents().addBack();
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
    if (result.length === 1) {
      return [cssSelectors, commonPath];
    }
    commonPath = cssSelectors.slice();
    i++;
  }
}

function selectElement(App, siblingSelector, DOMPath, styles, text, position) {
  if (App.state.firstElement) {
    // execute highlightElement
    // highlightElement(App, position, DOMPath, styles, text);
    // can't directly add to state
    App.addRecommendation(siblingSelector);
    App.toggleFirstElement();
  } else {
    if (!App.state.recommendations.includes(siblingSelector)) {
      highlightElement(App, position, DOMPath, styles, text);
      };
      let siblingsDOM = $(siblingSelector).each((index, element) => {
        console.log('element', element);
        let elePosition = cumulativeOffset(element);
        let eleDOMPath = $(element).getSelectors($(element).getDOMPath)[0];
        let eleStyles = setStyles.call(element);
        let eleText = cleanWhiteSpace($(element).text());
        highlightElement(App, elePosition, eleDOMPath, eleStyles, eleText);
    });
    console.log('propertyArray', App.state.propertyArray);

      // If siblingSelector matches recommendation in cue
      // Add Highlight to Each Recommendation [create new class]
        // Exclude the existing element
        // Add the DOM Path of Recommendation to Array (already in function)
        // Add the DOM Path of Recommendation to Data (already in function)
    // Else
      // Add Highlight to the Element
      // Add Recommendations via Function (w/ class)
  }
}

function setStyles () {
  return $(this).css([
    "width", "height", "font-size", "font-weight", "font-family", "font-variant", "font-stretch", "line-height", "text-transform", "text-align", "padding-top", "padding-bottom", "padding-left", "padding-right", "letter-spacing"]
  );
}

function highlightElement(App, position, DOMPath, styles, text) {
  App.addDOMToPropertyArray(DOMPath);
  $('.liveAPI-body').append(
    $('<div/>')
      .offset({ top: position.top, left: position.left })
      .css({ "font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"] })
      .data('DOMPath', DOMPath)
      // Add the data type here
      .addClass('liveAPI-newElement liveAPI-highlight liveAPI-yellow liveAPI-ignore')
      .append(
      $('<div/>')
      .addClass('liveAPI-highlight-wrapper liveAPI-ignore')
      .css({
        "max-width": styles["width"], "height": styles["height"],"padding-right": styles["padding-right"]
      })
      .text(text)
    )
    .append(
      $('<a/>')
        .addClass('liveAPI-highlight-button')
        .text('x')
      )
    )
}

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
      loading: true,
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
      text: {},
      firstElement: true
    }
    // ----------------toggle authentication 
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
      let completedArr = this.state.stepsCompleted.slice();
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
      $('.liveAPI-body').find('.liveAPI-newElement').remove();
    }
    this.saveProperty = (property) => {
      if (!property) return;
      let textObj = JSON.parse(JSON.stringify(this.state.text));
      textObj[property] = this.state.propertyArray.slice();
      this.setState({ text: textObj });
      
      // MELISSSA
      let newArr = this.state.scrapePropBtnArr.slice();
      newArr.push(property);
      this.setState({
        // property: property,
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

    this.getPropertyArray = () => {
      return this.state.propertyArray.slice();
    }

    this.setPropertyArray = (propertyArray) => {
      this.setState({ "propertyArray": propertyArray });
    }

    this.addDOMToPropertyArray = (DOMPath) => {
      const propArr = this.getPropertyArray();
      propArr.push(DOMPath);
      this.setState({ "propertyArray": propArr });
    }
    this.addRecommendation = (rcmd) => {
      const rcmdArr = this.state.recommendations.slice();
      rcmdArr.push(rcmd);
      this.setState({ "recommendations": rcmdArr });
    }
    this.toggleFirstElement = () => {
      this.state.firstElement ? this.setState({firstElement: false}) : this.setState({firstElement: true});
    }
    // end constructor /////////////////////////////////////
  }

  componentDidMount() {

    const App = this;

    // Prevents default click event
    $(document).on('click', '*', function () {
      return false;
    });
    // Stop propagation for highlight components

    $(document).on('click', '.liveAPI-highlight', (e) => e.stopImmediatePropagation());
    $(document).on('click', '.liveAPI-highlight-wrapper', (e) => e.stopImmediatePropagation());
    // DOMPath is removed from state when item is deselected
    $(document).on('click', '.liveAPI-highlight-button', function (e) {
      // Execute this function for all elements that have this data type
        // Find them first, then execute the following function
      const propArr = App.getPropertyArray();
      let DOMPath = $(this).parent().data('DOMPath');
      let index = propArr.indexOf(DOMPath);
      propArr.splice(index, 1);
      App.setPropertyArray(propArr);
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
      const siblingSelector = $(this).getSelectors($(this).getDOMPath)[1];
      // Remove event listener from elements with child div elements
      // Remove event listener from Toolbar elements
      // Add DOM Path to this.state.propertyArray
      if ($(this).find('div').length > 0) return false;
      if ($(this).closest('#lapiChromeExtensionContainer').length > 0) return false;
      if ($(this).hasClass("liveAPI-ignore")) return false;

      let styles = setStyles.call(this);
      let text = cleanWhiteSpace($(this).text());
      highlightElement(App, position, DOMPath, styles, text);
      selectElement(App, siblingSelector, DOMPath, styles, text, position);
    });

     setTimeout(() => this.setState({ loading: false }), 2000); 

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          {this.state.loading ?<Loader/>:null}

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
