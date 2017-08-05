import React, { Component } from 'react';
// import AccordionExampleStyled from './Accordian';
// import Iframe from './Iframe';
// import GridExampleVerticallyDivided from './Grid';
import $ from "../../jquery";
import Toolbar from "./Toolbar";
import Lowerbar from "./Lowerbar";
import Segment from "./Segment";


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
      lowerIcon: 'angle down',
      activeStep: 0,
      lowerBar: true,
      scrapePropNames: [],
      lowerSegment: false,
      segmentPropValue: '',
    }
    this.text = {};
    this.temporaryTextStorage = {};
    this.saveProperty = this.saveProperty.bind(this);
    // this.activateModal = () => {
    //   console.log("ji");
    //   this.setState({active: !this.state.active});
    // }

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

  saveProperty(property, DOMPath) {
    this.text[property] = DOMPath;
    console.log(this.text);
  }

  componentDidMount() {
    const App = this;
    $(document).on('click','*', function(){
      const path = $(this).fullSelector();
        App.temporaryTextStorage[path] = path;
        return false;
    });
    $(document).on('click', '.liveAPI-highlight', function(e) {
      e.stopImmediatePropagation();
    });

    $(document).on('click', '.liveAPI-highlight-wrapper', function(e) {
      e.stopImmediatePropagation();
    });

    $(document).on('click', '.liveAPI-highlight-button', function(e) {
      $(this).parent().data();
      $(this).parent().remove();
      // prevents other listeners of the same event from being called
      e.stopImmediatePropagation();
    });

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
      $('#lapiChromeExtensionContainer').append(
        $('<div/>')
        .offset({top: position.top, left: position.left})

        // Assign div element the CSS properties of the HTML Element
        .css({"font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"]})
        // Add DOM Path to the parent div element
        .data($(this).fullSelector())
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
      // console.log(cleanWhiteSpace($(this).text()));
    });
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
