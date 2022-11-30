import * as React from 'react'
import { HeroContainer } from './Hero.styles'
import { ButtonGroup } from 'common/components/JsonForm/JsonForm.styles'

interface Props {
  title: string
  allowSave: boolean
  allowReset: boolean
  onReset: () => void
  onSave: () => void
}

export const Hero: React.FunctionComponent<Props> = ({ title, allowSave, allowReset, onReset, onSave }) => {
  return (
    <HeroContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <h1>{title}</h1>
          </div>
          <div className='col-6 text-right'>
            <ButtonGroup className='buttons-group'>
              {allowReset && (
                <button type='button' onClick={onReset}>
                  Reset
                </button>
              )}
              {allowSave && (
                <button type='submit' className='submitForm' onClick={onSave}>
                  Save
                </button>
              )}
            </ButtonGroup>
          </div>
        </div>
      </div>
    </HeroContainer>
  )
}
