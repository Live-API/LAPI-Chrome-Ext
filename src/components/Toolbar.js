import React, { Component } from 'react';
import Modal from "./Modal";
import { Icon, Header, Button } from 'semantic-ui-react'
let imgUrlMenu = chrome.extension.getURL("src/assets/android-drawer.png")
let imgUrlArrow = chrome.extension.getURL("src/assets/arrow-right-b.png")
import $ from '../../jquery.js';
// let imgUrlX = chrome.extension.getURL("src/assets/close.png")

let imgUrlX = require("../assets/close.png")



class Toolbar extends Component {
    constructor(){
    super();
    this.state = {
      active: false
    }
    this.activateModal = () => {console.log("ji")
    this.setState({active: !this.state.active})
    
  }
    // this.activateModal = this.activateModal.bind(this)
    this.closeEx = () => {
      console.log("xi");
     $('#lapiChromeExtensionContainer').remove(); 
  }

  //   this.hideLow = () => {
  //     console.log("wi");
  //    $('#lapiChromeExtensionContainer').remove(); 
  // }

  // end constructor
  }
 
  componentDidMount(){
    console.log("body with jquery", $('#lapiChromeExtensionContainer'));
  }

  render() {
    return (
        <div className="tb">
              {/* <div id="leftMenu">
                <img onClick={this.activateModal} 
                src={imgUrlMenu} height="30px" width="30px"/>
                
            </div>   */}

            {/* <div className="titleDiv">
            LiveAPI
            </div> */}
            
            <Header as='h3' icon='align justify' content='LiveAPI' floated='left' inverted={true}/>
            
            <div className="leftHeader">
                <Icon inverted={true} name='angle down' />
              </div>

              <div className="rightHeader">
                <Icon inverted={true} name='remove' link={true} onClick={this.closeEx}/>
                {/* elem.parentNode.removeChild(elem); */}

              </div>

            {/* <div id="rightMenu">
                <img src={imgUrlArrow} height="30px" width="30px"/>
                <img src={imgUrlX} height="30px" width="30px"/>
            </div> */}

               {(this.state.active) ? <Modal /> : null}   
            

        </div>
    )
  }
}
export default Toolbar;