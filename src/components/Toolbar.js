import React, { Component } from 'react';
import Modal from "./Modal";
import { Icon, Header, Button } from 'semantic-ui-react';
import $ from '../../jquery.js';
//let imgUrlArrow = chrome.extension.getURL("src/assets/arrow-right-b.png")
//let imgUrlX = require("../assets/close.png")



class Toolbar extends Component {
   // componentDidMount(){
  //   console.log("body with jquery", $('#lapiChromeExtensionContainer'));
  // }

  render() {
    return (
        <div className="tb">
            
            {/* <Header as='h3' icon='align justify' content='LiveAPI' floated='left' inverted={true}/> */}
            
            <div className="leftHeader">
                <Modal/>
                 <Header as='h3' content='LiveAPI' inverted={true} className='menuh3'/> 
                <Icon inverted={true} name={(this.props.arrowDown)?'angle down':'angle right'} link={true} onClick={this.props.toggleLower}/>
                 {/* {(this.state.active) ? <Modal /> : null}     */}
            </div>

            <div className="rightHeader">
              <Icon inverted={true} name='remove' link={true} onClick={this.props.closeFunc}/>
            </div>

            
            

        </div>
    )
  }
}
export default Toolbar;