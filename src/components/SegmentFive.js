import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon, Link } from 'semantic-ui-react'

// document.addEventListener('DOMContentLoaded', function () {
//     var links = document.getElementsByTagName("a");
//     for (var i = 0; i < links.length; i++) {
//         (function () {
//             var ln = links[i];
//             var location = ln.href;
//             ln.onclick = function () {
//                 chrome.tabs.create({active: true, url: location});
//             };
//         })();
//     }
// });


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
    
    <Segment raised clearing>
        
        {(this.props.activeStep===5) ? <Input className='marginRightTen' icon='tag' iconPosition='left' placeholder='Endpoint Name (/crawls/{Endpoint Name})' name='endpoint' onBlur={this.handleChange}/> : null}
      
        {(this.props.activeStep===5) ? <Input className='marginRightTen' placeholder='Interval (amount of time between scrapes in seconds)' icon='repeat' iconPosition='left' type="text" value={this.props.value} name='interval' onBlur={this.handleChange}/> : null}

        {(this.props.activeStep===5) ? <Popup
          trigger={<Icon name='info'/>}
          content='This endpoint name will be part of the route for your endpoint. Example: www.yourserver.com/crawls/<the-endpoint-you-name-here>. Please do not use spaces or special characters besides dashes.'
          wide
        /> : null}

        {(this.props.activeStep===5) ? <Button className="propSaveBtn" onClick= {this.handleSubmit} floated='right'>Create Endpoint</Button> : null}

        {(this.props.activeStep===6) ? <div className="successText"><Icon color='green' name='check'/> Success! Your endpoint was created at {this.props.serverUrl}/crawls/{this.state.endpoint} and will be updated every {this.state.interval} second(s). </div> : null} 
        
        {(this.props.activeStep===6) ? <Button floated='right' onClick={newCrawl}>Initiate new crawl</Button> : null}

        {(this.props.activeStep===6) ? <Button floated='right'  onClick={()=>{window.open(`${this.props.serverUrl}/crawls/${this.state.endpoint}`)}}>Go to endpoint</Button> : null}
           
    </Segment>
    )
  }
}

export default SegmentFive