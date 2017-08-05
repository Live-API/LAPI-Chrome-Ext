import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class SegmentExampleRaised extends Component {

  render() {
    return (
    

    <Segment raised>
      
        <Input placeholder='Please name your prop' type="text" value={this.props.value} onChange={this.props.setValFunc}/>
        <Button className="propSaveBtn" onClick={this.props.saveFunc} floated='left'>Save</Button>
      
        <Button className="doneBtn" floated='right' onClick={this.props.doneFunc}>Done</Button>
     
    </Segment>
    )
  }
}

export default SegmentExampleRaised