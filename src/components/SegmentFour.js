import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

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
      this.props.saveURL(`http://${cred.address}`);
      const url = `http://${cred.address}/auth`;
      // console.log('url', url);
      // console.log('this.state', this.state);
      
      const xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log('xhr.responseText', xhr.responseText);
        }
      }
      
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({username: cred.username, password: cred.password}));
    }

    this.handleSubmit = (event) => {
      event.preventDefault();
      this.postCredentials(this.state);
      this.props.doneFunc();
    }

  }

  render() {
    return (
    

    <Segment raised>

          <Input className='marginRightTen' icon='add user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange} />

          <Input className='marginRightTen' icon='lock' iconPosition='left' placeholder='Password' name='password' type='password' onChange={this.handleChange} />
      
         <Input className='marginRightTen' placeholder='Address' icon='repeat' iconPosition='left' type="text" icon='external' iconPosition='left' placeholder='Address' name='address' onChange={this.handleChange} style={{width:'400px'}}/> 

         <Button className="propSaveBtn" onClick={this.handleSubmit} floated='right'>Login</Button>
           
    </Segment>
    )
  }
}

export default SegmentFour