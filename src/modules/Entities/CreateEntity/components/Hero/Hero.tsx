import * as React from 'react'
import { useLocation } from 'react-router-dom'

import Hourglass from 'assets/icons/Hourglass'
import { HeroContainer, AutoSaveWrapper } from './Hero.styles'
import { ButtonGroup } from 'common/components/JsonForm/JsonForm.styles'

interface Props {
  title: string
  allowSave: boolean
  allowReset: boolean
  allowAutoSave?: boolean
  onReset: () => void
  onSave: () => void
}

export const Hero: React.FunctionComponent<Props> = ({
  title,
  allowSave,
  allowReset,
  allowAutoSave,
  onReset,
  onSave,
}) => {
  const { pathname } = useLocation()

  const shouldShowAutosaved = React.useMemo(() => {
    if (!allowAutoSave) return false

    const paths = pathname.split('/')

    if (paths[paths.length - 1] === 'template') return false

    return true
  }, [pathname, allowAutoSave])

  return (
    <HeroContainer>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <h1>{title}</h1>
          <div>
            <ButtonGroup className='buttons-group' style={{ width: 'auto' }}>
              {shouldShowAutosaved && (
                <AutoSaveWrapper title='This form saves automatically'>
                  <span>Autosaved</span> <Hourglass fill='#2B84A3' width={22} />
                </AutoSaveWrapper>
              )}
              {allowReset && (
                <button type='button' onClick={onReset}>
                  Reset
                </button>
              )}
              {allowSave && !allowAutoSave && (
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
