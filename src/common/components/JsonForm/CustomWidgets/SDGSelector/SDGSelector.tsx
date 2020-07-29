import React from 'react'
import SDGDropDown from '../../../Controls/IconDropDown/SDGDropDown/SDGDropDown'
import { AddButton, RemoveButton } from './SDGSelector.styles'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SDGSelector: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const sdgs = value.split('|')

  const handleSDGOnChange = (sdg: string, index: number): void => {
    const newSDGS = [...sdgs]
    newSDGS[index] = sdg
    onChange(newSDGS.join('|'))
  }

  const handleSDGOnAdd = (): void => {
    const newSDGS = [...sdgs, '']
    onChange(newSDGS.join('|'))
  }

  const handleSDGOnRemove = (index: number): void => {
    const newSDGS = [...sdgs].filter((sdg, i) => i !== index)
    onChange(newSDGS.join('|'))
  }

  return (
    <>
      {sdgs.map((sdg, i) => {
        return (
          <div key={i}>
            <SDGDropDown
              value={sdg}
              onChange={(sdg): void => handleSDGOnChange(sdg, i)}
            />
            {i > 0 && (
              <RemoveButton
                type="button"
                onClick={(): void => handleSDGOnRemove(i)}
              >
                - Remove Tag
              </RemoveButton>
            )}
          </div>
        )
      })}
      <br />
      <AddButton type="button" onClick={handleSDGOnAdd}>
        + Add Tag
      </AddButton>
    </>
  )
}

export default SDGSelector
