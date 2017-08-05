import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import SendDefinitionDialog from './SendDialog.jsx';

class SendDefinitionModal extends Component {
  postCredentials(endpoint) {
    const url = `http://${this.props.address}/crawls`;
    console.log(url);
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    }
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(endpoint));
  }
  
  render() {
    return(
      <Modal trigger={this.props.trigger} basic size='small'>
        <Modal.Content>
          <SendDefinitionDialog submission={this.postCredentials} />
        </Modal.Content>
      </Modal>
    );
  }
}

export default SendDefinitionModal;
