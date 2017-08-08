import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon } from 'semantic-ui-react'

class SegmentFour extends Component {
  constructor(props) {
      super(props);
      this.state = {};
    

      this.handleChange = (event) => {
      const state = {};
      state[event.target.name] = event.target.value;
      this.setState(state);
    }

    this.postCredentials = (cred) => {
      return new Promise( (resolve, reject) => {
        
        this.props.saveURL(`https://${cred.address}`);
        const url = `https://${cred.address}/auth`;
        console.log('url', url);
        console.log('this.state', this.state);
        
        const xhr = new XMLHttpRequest();
        
        // xhr.onreadystatechange = function() {
        //   if (xhr.readyState == XMLHttpRequest.DONE) {
        //     console.log(xhr.responseText);
        //   }
        // }
        
        xhr.onreadystatechange = () => {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            
            if (xhr.status === 200) {
              this.props.signIn();
              console.log(xhr.responseText);
            } else {
              console.log(this.props.authed);
              console.log("The status was not 200, but: ", xhr.status);
              console.log(xhr.responseText);
            }
            resolve();
          }
        }


        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({username: cred.username, password: cred.password}));
      });
    }

    this.handleSubmit = async (event) => {
      event.preventDefault();
      await this.postCredentials(this.state);
      // this.props.authAttemptedFunc();
      (this.props.authed) ? this.props.doneFunc() : this.props.authAttemptedFunc();
    }

  }

  render() {
    return (
    

    <Segment raised>

          {(this.props.authed==false) ? <Input className='marginRightTen' icon='add user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange} /> : null}

          {(this.props.authed==false) ? <Input className='marginRightTen' icon='lock' iconPosition='left' placeholder='Password' name='password' type='password' onChange={this.handleChange} /> : null}
      
         {(this.props.authed==false) ? <Input className='marginRightTen' placeholder='Address' icon='repeat' iconPosition='left' type="text" icon='external' iconPosition='left' name='address' onChange={this.handleChange} style={{width:'400px'}}/> : null}


        {(this.props.authed==false) ? <Popup
          trigger={<Icon name='info'/>}
          content='This is the URL for your LAS server. If you did not set this up yourself, ask your system administrator for this address.'
          basic
          inverted
        /> : null}

            {((this.props.authed==false) && (this.props.authAttemptedNum>0)) ? <div className="alertText">Authentication failed, please try again.</div> : null}  

         <Button className="propSaveBtn" onClick={this.handleSubmit} floated='right'>Login</Button>
           
    </Segment>
    )
  }
}

export default SegmentFour

