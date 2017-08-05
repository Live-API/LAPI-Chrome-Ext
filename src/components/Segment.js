import React, { Component }  from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class SegmentExampleRaised extends Component {

  render() {
    return (
    

    <Segment raised>
        <Input id='live-API-property-textbox' placeholder='Please name your prop' type="text" onBlur={(e) => this.props.getPropertyName(e)}/>
        <Button className="propSaveBtn" onClick={() => this.props.saveProperty(this.props.property)}>Save</Button>
    </Segment>
    )
  }
}

export default SegmentExampleRaised