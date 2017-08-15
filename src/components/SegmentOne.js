import React, { Component }  from 'react'
import { Button, Input, Segment, Popup, Icon, Grid } from 'semantic-ui-react'

class SegmentOne extends Component {

  constructor(props) {
    super(props);
      this.state = {
        errText: '',
        saveErrBool: false,
        errBool: false
      }

      this.nextSteps = () => {
        this.props.setCrawlUrl(window.location.href);
        (this.props.scrapePropBtnArr.length === 0) ? (this.setState({errBool: true}), this.setState({errText: "Please save at least one DOM element to scrape."})) : (this.setState({errBool: false}), this.props.doneFunc());
      }

      this.saveSteps = (passedProperty) => {
        if (!passedProperty || this.props.selPropArr.length === 0) {
          this.setState({saveErrBool: true});
          this.setState({errText: "To save a property name you need to enter a name in the input field and select at least one DOM element as a value."})
        } else {
          this.setState({saveErrBool: false});
          this.props.saveProperty(this.props.property);
        }
      
      }


    }


  render() {
    return (
    

    <Segment raised>

      <Grid columns='equal'>
        <Grid.Column width={4}>
          <Input className='marginRightTen' id='live-API-property-textbox' placeholder='Please name your prop' type="text" value={this.props.value} onBlur={(e) => this.props.getPropertyName(e)}/>


        <Button primary className="propSaveBtn" onClick={() => this.saveSteps(this.props.property)}>Save</Button>

          <Popup
          trigger={<Icon name='info'/>}
          content='Once you click on the DOM element you want as a property in your object, name it and save it. Do this as many times as you need to for subsequent properties.'
        />
          
        </Grid.Column>

        <Grid.Column width={10}> 
          <div className="floatLeft"> {this.props.scrapePropBtnArr.map((el)=><Button content={el} icon='remove' labelPosition='right' onClick={(e, el)=>this.props.removeProperty(e, el)}/>)} </div>

        {((this.props.scrapePropBtnArr.length===0 && this.state.errBool) || this.state.saveErrBool) ? <div className="alertTextGrid">{this.state.errText}</div> : null}  

        

        </Grid.Column>

        <Grid.Column width={2}>
          <Button primary className="LiveAPI-doneBtn liveAPI-ignore" floated='right' onClick={this.nextSteps}>Done</Button>
        </Grid.Column>
      </Grid>
    

    </Segment>
    )
  }
}

export default SegmentOne

