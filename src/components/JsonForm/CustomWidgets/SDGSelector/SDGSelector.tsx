import React from 'react'
import SDGDropDown from '../../../Controls/IconDropDown/SDGDropDown/SDGDropDown'
import { AddButton, RemoveButton } from './SDGSelector.styles'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const SDGSelector: React.FunctionComponent<Props> = ({ id, value, onChange, onBlur, onFocus }) => {
  const sdgs = value.split('|')

  const handleOnChange = (sdgs: string[]): void => {
    // TODO - find a better way to get unique
    // const distinctSDGS = Array.from(new Set(sdgs.map((sdg: string) => sdg)))
    onChange(sdgs.join('|'))
  }

  const handleSDGOnChange = (sdg: string, index: number): void => {
    const newSDGS = [...sdgs]
    newSDGS[index] = sdg
    handleOnChange(newSDGS)
  }

  const handleSDGOnAdd = (): void => {
    const newSDGS = [...sdgs, '']
    handleOnChange(newSDGS)
  }

  const handleSDGOnRemove = (index: number): void => {
    const newSDGS = [...sdgs].filter((sdg, i) => i !== index)
    handleOnChange(newSDGS)
  }

  return (
    <>
      {sdgs.map((sdg, i) => {
        return (
          <div key={i}>
            <SDGDropDown
              onBlur={(value): void => onBlur(id, value)}
              onFocus={(value): void => onFocus(id, value)}
              value={sdg}
              excludes={sdgs}
              onChange={(sdg): void => handleSDGOnChange(sdg, i)}
            />
            {sdgs.length > 1 && (
              <RemoveButton type='button' onClick={(): void => handleSDGOnRemove(i)}>
                - Remove Tag
              </RemoveButton>
            )}
          </div>
        )
      })}
      <AddButton type='button' onClick={handleSDGOnAdd}>
        + Add Tag
      </AddButton>
    </>
  )
}

export default SDGSelector
