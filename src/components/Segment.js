import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class SegmentExampleRaised extends Component {

  render() {
    return (
    

    <Segment raised>
      
        <Input id='live-API-property-textbox' placeholder='Please name your prop' type="text" value={this.props.value} onBlur={(e) => this.props.getPropertyName(e)}/>
        <Button className="propSaveBtn" onClick={() => this.props.saveProperty(this.props.property)} floated='left'>Save</Button>
      
        <Button className="doneBtn" floated='right' >Done</Button>
     
    </Segment>
    )
  }
}

export default SegmentExampleRaised