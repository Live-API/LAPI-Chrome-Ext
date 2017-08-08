import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon } from 'semantic-ui-react'

class SegmentOne extends Component {

  render() {
    return (
    

    <Segment raised>
      

        {/* <Input placeholder='Please name your prop' type="text" value={this.props.value} onChange={this.props.setValFunc}/>
        <Button className="propSaveBtn" onClick={this.props.saveFunc} >Save</Button> */}

        <Input className='marginRightTen' id='live-API-property-textbox' placeholder='Please name your prop' type="text" value={this.props.value} onBlur={(e) => this.props.getPropertyName(e)}/>


        <Button className="propSaveBtn" onClick={() => this.props.saveProperty(this.props.property)}>Save</Button>

          <Popup
          trigger={<Icon name='info'/>}
          content='Once you click on the DOM element you want as a property in your object, name it and save it. Do this as many times as you need to for subsequent properties.'
          basic
          inverted
        />

      
        <Button className="doneBtn" floated='right' onClick={this.props.doneFunc}>Done</Button>
     
    </Segment>
    )
  }
}

export default SegmentOne