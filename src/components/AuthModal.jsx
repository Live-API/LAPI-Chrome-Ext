import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import CreateUserDialog from './AuthDialog.jsx';

class AuthModal extends Component {
  postCredentials(cred) {
    const url = `http://${cred.address}/auth`;
    console.log(url);
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    }
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({username: cred.username, password: cred.password}));
  }
  
  render() {
    return(
      <Modal trigger={this.props.trigger} basic size='small'>
        <Modal.Content>
          <CreateUserDialog submission={this.postCredentials} />
        </Modal.Content>
      </Modal>
    );
  }
}

export default AuthModal
