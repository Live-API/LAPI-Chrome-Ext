import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderExampleLoader = () => (
    <Dimmer page active inverted>
        <Loader inverted size='large'>
            Loading
        </Loader>
    </Dimmer>

)

export default LoaderExampleLoader