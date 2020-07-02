import React from 'react'
import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  value: string
  onChange: (value: string) => void
}

const ImageUpload: React.FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <ImageLoader
      handleSave={(base64EncodedImage): void => console.log(base64EncodedImage)}
      imageWidth={100}
    />
  )
}
