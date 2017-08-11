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

    this.postEndpoint = (config, text, crawlUrl, postUrl) => {
      return new Promise((res, rej) => {
        let data = {
          url: crawlUrl,
          interval: config.interval,
          endpoint: config.endpoint,
          "text": text
        }
        let postURL = postUrl + '/crawls';
        console.log('data', data);
        console.log('postUrl', postUrl);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            // res(xhr.responseText);
            console.log("status", xhr.status)
            res(xhr.status);
          }
        }

        xhr.open("POST", postURL);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      })
    };

    // is ASYNC issue keeping active step from incrementing correctly? <-NOTE
    this.handleSubmit = async() => {
      if (this.state.endpoint && this.state.interval) {
        this.setState({disabled: false})
        try {
          // console.log(await this.postEndpoint(this.state, this.props.text, this.props.url));
          let status = (await this.postEndpoint(this.state, this.props.text, this.props.crawlUrl, this.props.serverUrl));
          if (status === 200){
            this.setState({serverErr: false});
            this.props.doneFunc();
          } else {
            this.setState({serverErr: true});
          }
        } catch(err) {
          console.log(err);
        } 
      } else {
        this.setState({disabled: true});
      }
    }

  }

  render() {
    return (
    
    <Segment raised clearing>
        
        {(this.props.activeStep===5) ? <Input className='marginRightTen' icon='tag' iconPosition='left' placeholder='Endpoint Name' name='endpoint' onBlur={this.handleChange}/> : null}
      
        {(this.props.activeStep===5) ? <Input className='marginRightTen' placeholder='Interval' icon='repeat' iconPosition='left' type="text" value={this.props.value} name='interval' onBlur={this.handleChange} style={{width:'100px'}}/> : null}

        {(this.props.activeStep===5) ? <Popup
          trigger={<Icon name='info'/>}
          content='This endpoint name will be part of the route for your endpoint; please do not use spaces or special characters besides dashes (www.yourserver.com/crawls/<endpoint-name>). The interval is the amount of time you want to wait between scrapes measured in seconds.)'
          wide
        /> : null}

        {(this.props.activeStep===5) ? <Button className="propSaveBtn" onClick= {this.handleSubmit} floated='right'>Create Endpoint</Button> : null}

        {(this.props.activeStep===6) ? <div className="successText"><Icon color='green' name='check'/> Success! Your endpoint was created at {this.props.serverUrl}/crawls/{this.state.endpoint} and will be updated every {this.state.interval} second(s). </div> : null} 

        {(this.state.disabled) ? <div className="alertText">Please enter both a name and an interval.</div> : null} 

        {(this.state.serverErr) ? <div className="alertText">The server encountered an error; no endpoint has been created. Please try again.</div> : null}  
        
        {(this.props.activeStep===6) ? <Button primary floated='right' onClick={this.props.initializeNewCrawl}>Initiate new crawl</Button> : null}

        {(this.props.activeStep===6) ? <Button secondary floated='right'  onClick={()=>{window.open(`${this.props.serverUrl}/crawls/${this.state.endpoint}`)}}>Go to endpoint</Button> : null}
           
    </Segment>
    )
  }
}

export default SegmentFive