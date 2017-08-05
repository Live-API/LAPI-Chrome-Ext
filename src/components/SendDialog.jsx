import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Input, Divider, Button, Form, Icon } from 'semantic-ui-react'

class SendDefinitionDialog extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    this.props.submission(this.state);
    event.preventDefault();
  }
  
  render() {
    return (
      <Card fluid color='black'>
        <Card.Content>
          <Card.Header>
            Create API Endpoint
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Endpoint Name</label>
              <Input fluid icon='tag' iconPosition='left' placeholder='/crawls/{Endpoint Name}' name='endpoint' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Interval (in seconds)</label>
              <Input fluid icon='repeat' iconPosition='left' placeholder='Amount of time between scrapes' name='interval' onChange={this.handleChange} />
            </Form.Field>
            <Divider />
            <button type='submit'>Create Endpoint</button>
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default SendDefinitionDialog;