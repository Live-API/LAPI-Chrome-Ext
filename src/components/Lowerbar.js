import React, { Component } from 'react';
import Step from "./Step";
import { Grid, Container } from 'semantic-ui-react'

class Lowerbar extends Component {
  render() {
    return (
        <Container className='constWidth'>
            <Step activeStep={this.props.activeStep} stepsCompleted={this.props.stepsCompleted}/>
        </Container>
    )
  }
}
export default Lowerbar;