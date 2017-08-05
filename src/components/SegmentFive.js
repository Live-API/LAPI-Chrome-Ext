import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class SegmentFive extends Component {

  render() {
    return (
    

    <Segment raised>

        
        <Input className='marginRightTen' icon='tag' iconPosition='left' placeholder='Endpoint Name (/crawls/{Endpoint Name})' name='endpoint' onChange={this.handleChange}/>
      
        <Input className='marginRightTen' placeholder='Interval (amount of time between scrapes in seconds)' icon='repeat' iconPosition='left' type="text" value={this.props.value} onChange={this.props.setValFunc} name='interval' onChange={this.handleChange}/> 

        <Button className="propSaveBtn" onClick={this.props.doneFunc} floated='right'>Create Endpoint</Button>
           
    </Segment>
    )
  }
}

export default SegmentFive