import React, { Component } from 'react';;
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import SegmentOne from "./SegmentOne";
import SegmentFour from "./SegmentFour";
import SegmentFive from "./SegmentFive";


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
            // remove leading, trailing, and excess white space
            classes = item.classList.toString();
            classes = classes.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ")
            var clss = classes.length ? classes.split(' ').map(function (c) {
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
    }).join(' > ');
    return quickCss;
};

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
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top + 230,
    left: left
  };
};

class App extends Component {
    constructor(){
    super();
    this.state = {
      serverUrl: '',
      crawlUrl: '',
      activeStep: 1,
      authenticated: false,
      authAttemptNum: 0,
      stepsCompleted: [],
      lowerBar: true,
      // scrapePropNames: [],
      scrapePropBtnArr: [],
      lowerSegment: false,
      // segmentPropValue: '', 
      property: undefined,
      propertyArray: [],
      text: {}
    }


    // toggle authentication 
    this.signIn = () => {
      console.log(this);
      this.setState({authenticated: true});
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

    // remove property
    this.removeProperty = (e, el) => {
        let propArr = this.state.scrapePropBtnArr;
        console.log("propArr", propArr);
        propArr.forEach((element, i)=>{
            console.log("i", i);
            if (element === el.content){
                propArr.splice(i,1);
                console.log("HEY", propArr)
                this.setState({scrapePropBtnArr: propArr});
                this.deleteProperty(el.content);
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
      this.setState({authAttemptNum: attempt});
      console.log("attempt", this.state.authAttemptNum);
      console.log("attempt from state",this.state.authAttemptNum);
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

    // save scrapePropNames
    // this.saveScrapePropNames = () => {
    //   let newArr = this.state.scrapePropNames;
    //   newArr.push(this.state.segmentPropValue);
    //   this.setState({scrapePropNames: newArr});
    //   console.log(this.state.scrapePropNames)
    // }

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
      this.setState({lowerBar: !this.state.lowerBar});
      this.lowerBarTransformCssToggle();
    }

    this.savePostURL = (url) => {
      this.setState({serverUrl: url})
    }

    /* 
      Following functions are used in Step 1 to assign property name to the selected HTML elements.
  
      getPropertyName - gets value of textbox
      resetPropertyName - resets value of textbox after saving
      saveProperty - saves property name to state
    */
  
    // Gets value of the property textbox
    this.getPropertyName = (e) => {
      this.setState({property: e.target.value});
    }
  
    // Clears the property textbox. Executed in saveProperty function
    this.resetPropertyName = () => {
      const propertyTextbox = document.getElementById('live-API-property-textbox');
      propertyTextbox.value = '';
      this.setState({property: undefined});
    }

    this.resetPropertyArray = () => {
      this.setState({ propertyArray: [] });
    }
  
    this.saveProperty = (property) => {
      if (!property) return;
      let textObj = JSON.parse(JSON.stringify(this.state.text));
      textObj[property] = this.state.propertyArray.slice();
      this.setState({text: textObj});
      this.resetPropertyName();
      this.resetPropertyArray();
      
      // MELISSSA
        let newArr = this.state.scrapePropBtnArr;
        newArr.push(property);
        this.setState({
          property: property,
          scrapePropBtnArr: newArr
        });
    }
    
     // Delete property from text object
      this.deleteProperty = (property) => {
      if (!property) return;
      delete this.text[property];
      }
  
    this.setCrawlUrl = (url) => {
      this.setState({crawlUrl: url});

  // end constructor /////////////////////////////////////
  }


    }
  

  componentDidMount() {
    const Application = this;

    $(document).on('click','*', function (){
        return false;
    });
    // Stop propagation for highlight components


    $(document).on('click', '.liveAPI-highlight', function(e) {
      e.stopImmediatePropagation();
    });
    $(document).on('click', '.liveAPI-highlight-wrapper', function(e) {
      e.stopImmediatePropagation();
    });

    // DOMPath is removed from state when item is deselected
    $(document).on('click', '.liveAPI-highlight-button', function(e) {

      // Abstract this into a function

      const propertyArray = Application.state.propertyArray.slice();
      let currDOMPath = $(this).parent().data('DOMPath');
      let index = propertyArray.indexOf(currDOMPath);
      propertyArray.splice(index, 1);
      Application.setState({"propertyArray": propertyArray});
      $(this).parent().remove();
      e.stopImmediatePropagation();
    });

    // Return false when the element is part of the Toolbar

    // Return false for creation of multiple highlighting

    // Return false if the element is not a
      // div, span, li, p element
    
    // Add logic for div elements

    $(document).on('click', '*', function() {
      console.log('this', this);
      console.log('Application.state.propertyArray', Application.state.propertyArray);
      if (Application.state.propertyArray.includes($(this).fullSelector())) return false;
      // Check if DOM Path is in the array
        // If so, return false
      let children = $(this).children().map((i, ele) => ele.nodeName.toLowerCase()).get();
      // let pathId = $(this).parents().addBack().get().map((ele, i) => ele.id);
      let pathClassList = $(this).parents().addBack().get().map((ele, i) => ele.classList);
      if ($(this)[0].nodeName.toLowerCase() === 'div' && children.includes('div')) return false;
      // Prevent click event on highlighted box
      for (let i = 0; i < pathClassList.length; i++) {        
        // console.log('pathClassList[i]', pathClassList[i]);
        if (Array.from(pathClassList[i]).includes('.liveAPI-newElement')) return false;
      }
      // Prevent click event on buttons
      if (pathClassList[0][0] === 'ui' && pathClassList[0][1] === 'raised' && pathClassList[0][2] === 'segment') return false;

      let styles = $(this).css([
        "width", "height", "font-size", "font-weight", "font-family", "font-variant", "font-stretch", "line-height", "text-transform", "text-align", "padding-top", "padding-bottom", "padding-left", "padding-right", "letter-spacing"]
      );
      
      const position = cumulativeOffset(this);
      const DOMPath = $(this).fullSelector();
      // Add DOM Path to this.state.propertyArray
      const propertyArray = Application.state.propertyArray.slice();
      propertyArray.push(DOMPath);
      Application.setState({"propertyArray": propertyArray});
      $('body').append(
        $('<div/>')
        .offset({top: position.top, left: position.left})

        // Assign div element the CSS properties of the HTML Element
        .css({"font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"]})
        // Add DOM Path to the parent div element
        .data('DOMPath', DOMPath)
        // Add highlight and ignore classes
        // Add highlight and ignore classes
        .addClass('liveAPI-newElement liveAPI-highlight liveAPI-yellow liveAPI-ignore')
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
            
          {(this.state.lowerBar && (this.state.activeStep===1)) ? <SegmentOne text={this.state.text} doneFunc={this.stepForward} getPropertyName={this.getPropertyName} property={this.state.property} saveProperty={this.saveProperty} setCrawlUrl={this.setCrawlUrl} scrapePropBtnArr={this.state.scrapePropBtnArr} removeProperty={this.removeProperty}/> : null}

           {/* {(this.state.lowerBar && (this.state.activeStep===4)) ? <SegmentFour saveURL={this.saveURL} doneFunc={this.stepForward} signIn={this.signIn} authed={this.state.authenticated} authAttemptedFunc={this.authAttemptedFunc} authAttemptedNum={this.state.authAttemptNum} logout={this.logout}/> : null} */}


           {(this.state.lowerBar && (this.state.activeStep===4)) ? <SegmentFour savePostURL={this.savePostURL} doneFunc={this.stepForward} signIn={this.signIn} authed={this.state.authenticated} authAttemptedFunc={this.authAttemptedFunc} authAttemptedNum={this.state.authAttemptNum} logout={this.logout}/> : null}

            {(this.state.lowerBar && ((this.state.activeStep===5) || (this.state.activeStep===6))) ? <SegmentFive doneFunc={this.stepForward} text={this.state.text} activeStep={this.state.activeStep} crawlUrl={this.state.crawlUrl} serverUrl={this.state.serverUrl} initializeNewCrawl={this.initializeNewCrawl}/> : null}

        </div>
      </div>
    );
  }
}

export default App;
