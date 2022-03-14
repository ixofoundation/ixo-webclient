import React from 'react'
import Embedly from '../../../Embedly/Embedly'
import IconInput, {
  Type,
} from '../../../Controls/IconInput/SocialInput/SocialInput'
import { isHttpsUrl } from 'common/utils/validationUtils'
import { RemoveButton, AddButton } from './EmbeddedUrlTextBox.styles'

interface Props {
  id: string
  value: string
  placeholder: string
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
  onChange: (value: string) => void
}

const EmbeddedUrlTextBox: React.FunctionComponent<Props> = ({
  id,
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}) => {
  const urls = value.split('|')

  const handleUrlOnChange = (url: string, index: number): void => {
    const newUrls = [...urls]
    newUrls[index] = url

    onChange(newUrls.join('|'))
  }

  const handleUrlOnAdd = (): void => {
    const newUrls = [...urls, '']
    onChange(newUrls.join('|'))
  }

  const handleUrlOnRemove = (index: number): void => {
    const newUrls = [...urls].filter((url, i) => i !== index)

    onChange(newUrls.join('|'))
  }

  return (
    <>
      {urls.map((url, i) => {
        return (
          <div key={i}>
            <IconInput
              type={Type.Other}
              placeholder={placeholder}
              value={url}
              onChange={(url): void => handleUrlOnChange(url, i)}
              onBlur={(value): void => onBlur(id, value)}
              onFocus={(value): void => onFocus(id, value)}
            />
            {url && !isHttpsUrl(url) && (
              <p>Please enter a valid url that starts with https://</p>
            )}
            {url && isHttpsUrl(url) && <Embedly url={url} />}
            {i > 0 && (
              <RemoveButton
                type="button"
                onClick={(): void => handleUrlOnRemove(i)}
              >
                - Remove Link
              </RemoveButton>
            )}
          </div>
        )
      })}
      <AddButton type="button" onClick={handleUrlOnAdd}>
        + Add Link
      </AddButton>
    </>
  )
}

export default EmbeddedUrlTextBox
