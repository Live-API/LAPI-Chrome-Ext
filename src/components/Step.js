import React from 'react'
import { Grid, Step } from 'semantic-ui-react'

const steps = [
  { active: true, link: true, completed: false, title: 'Select DOM Elements', description: 'Click on DOM elements that you want as properties in your data object.' },
  { disabled: true, active: false, completed: false, title: 'Select Details', description: 'Click on nested elements that you want as properties in your data object.' },
  { disabled: true, active: false, title: 'Identify Pagination Links', description: 'If you desire pagination, click on the "next" link.' },
  { active: false, title: 'Authorization', description: 'Authorize yourself and serve your endpoint' },
  { active: false, title: 'Create Endpoint', description: 'Authorize yourself and serve your endpoint' }
]

const StepExampleOrdered = () => (


     <Step.Group fluid size='small' ordered items={steps} /> 
    
)

export default StepExampleOrdered


    
    {/* <Step.Group ordered>
      <Step completed>
        <Step.Content>
          <Step.Title>Select DOM Elements</Step.Title>
          <Step.Description>Click on elements that you want as properties in your data object.</Step.Description>
        </Step.Content>
      </Step>

      <Step completed title='Select Details' description='Click on nested elements that you want as properties in your data object.' />

      <Step active title='Identitfy Pagination Links' description='If you desire pagination, click on the "next" link.' />
    </Step.Group>

    <br /> */}