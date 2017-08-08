import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon } from 'semantic-ui-react'

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
      return new Promise((res, rej) => {
        let data = {
          url: document.location.href,
          interval: config.interval,
          endpoint: config.endpoint,
          "text": text
        }
        let postURL = url + '/crawls';
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            res(xhr.responseText);
          }
        }

        xhr.open("POST", postURL);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      })
    };

    this.handleSubmit = async() => {
      try {
        console.log(await this.postEndpoint(this.state, this.props.text, this.props.url));
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

        <Popup
          trigger={<Icon name='info'/>}
          content='This endpoint name will be part of the route for your endpoint. Example: www.yourserver.com/crawls/<the-endpoint-you-name-here>. Please do not use spaces or special characters besides dashes.'
          basic
        />

        <Button className="propSaveBtn" onClick= {this.handleSubmit} floated='right'>Create Endpoint</Button>
           
    </Segment>
    )
  }
}

export default SegmentFive