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

export const Hero: React.FunctionComponent<Props> = ({
  title,
  allowSave,
  allowReset,
  onReset,
  onSave,
}) => {
  return (
    <HeroContainer>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <h1>{title}</h1>
          <ButtonGroup className="buttons-group" style={{ width: 'auto' }}>
            {allowReset && (
              <button type="button" onClick={onReset}>
                Reset
              </button>
            )}
            {allowSave && (
              <button type="submit" className="submitForm" onClick={onSave}>
                Save
              </button>
            )}
          </ButtonGroup>
        </div>
      </div>
    </HeroContainer>
  )
}
