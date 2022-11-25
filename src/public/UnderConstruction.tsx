import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { ButtonTypes, Button } from 'common/components/Form/Buttons'
import { Banner, BannerLeft, BannerRight, ButtonContainer } from './ErrorPages.styles'

export const UnderConstruction: React.SFC = () => {
  const history = useHistory()

  return (
    <Banner className='row'>
      <div className='col-lg-4'>
        <BannerLeft>
          <img src={require('../assets/images/underconstruction/x-outline.png')} alt='' />
        </BannerLeft>
      </div>
      <div className='col-lg-8 col-md-12'>
        <BannerRight>
          <div className='container'>
            <h2>Under construction.</h2>
            <p>
              This page is currently being built and should be available to view soon. Please come back another day.{' '}
            </p>
            <ButtonContainer>
              <Button type={ButtonTypes.dark} onClick={(): void => history.goBack()}>
                Back to previous page
              </Button>
            </ButtonContainer>
          </div>
        </BannerRight>
      </div>
    </Banner>
  )
}
