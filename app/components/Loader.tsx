import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderComponent = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <Loader active size='medium' inline='centered'>Loading</Loader>
    </div>
  )
}

export default LoaderComponent