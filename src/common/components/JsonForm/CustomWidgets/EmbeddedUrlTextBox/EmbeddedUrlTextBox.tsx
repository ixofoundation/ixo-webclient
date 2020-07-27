import React from 'react'
import Embedly from '../../../Embedly/Embedly'
import IconInput, {
  Type,
} from '../../../Controls/IconInput/SocialInput/SocialInput'
import { isHttpsUrl } from 'src/common/utils/validationUtils'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const EmbeddedUrlTextBox: React.FunctionComponent<Props> = ({
  value,
  placeholder,
  onChange,
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
            />
            <br />
            {url && !isHttpsUrl(url) && (
              <p>Please enter a valid url that starts with https://</p>
            )}
            {url && isHttpsUrl(url) && <Embedly url={url} />}
            {i > 0 && (
              <button type="button" onClick={(): void => handleUrlOnRemove(i)}>
                -
              </button>
            )}
          </div>
        )
      })}
      <br />
      <button type="button" onClick={handleUrlOnAdd}>
        + Add Link
      </button>
    </>
  )
}

export default EmbeddedUrlTextBox
