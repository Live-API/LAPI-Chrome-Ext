import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class SegmentFive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = (event) => {
      const state = {};
      state[event.target.name] = event.target.value;
      this.setState(state);
    }

    this.postEndpoint = (config, text, url) => {
      let data = {
        url: document.location.href,
        interval: config.interval,
        endpoint: config.endpoint,
        "text": text
      }

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log(xhr.responseText);
        }
      }

      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    }

    this.handleSubmit = async() => {
      try {
        await this.postEndpoint(this.state, this.props.text, this.props.url);
        this.props.doneFunc();
      } catch(err) {
        console.log(err);
      } 
    }
  }

  render() {
    return (
    
    <Segment raised>
        
        <Input className='marginRightTen' icon='tag' iconPosition='left' placeholder='Endpoint Name (/crawls/{Endpoint Name})' name='endpoint' onBlur={this.handleChange}/>
      
        <Input className='marginRightTen' placeholder='Interval (amount of time between scrapes in seconds)' icon='repeat' iconPosition='left' type="text" value={this.props.value} name='interval' onBlur={this.handleChange}/> 

        <Button className="propSaveBtn" onClick= {this.handleSubmit} floated='right'>Create Endpoint</Button>
           
    </Segment>
    )
  }
}

export default SegmentFive