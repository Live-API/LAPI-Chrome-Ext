import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon } from 'semantic-ui-react'

class SegmentOne extends Component {
  constructor(props) {
    super(props);
    this.nextSteps = () => {
      this.props.setCrawlUrl(window.location.href);
      this.props.doneFunc();
      console.log('text', this.props.text);
    }
  }
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
        />
      
        <Button className="doneBtn" floated='right' onClick={this.nextSteps}>Done</Button>
     
    </Segment>
    )
  }
}

export default SegmentOne