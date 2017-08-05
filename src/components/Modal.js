import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const ModalScrollingExample = () => (
<Modal dimmer="blurring" trigger={<Icon inverted={true} name='align justify' link={true}/>}> 
    <Modal.Header>LiveAPI User Menu</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Contextual Menu Option</Header>
        <p>User configuration, settings, options and views available here.</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalScrollingExample
