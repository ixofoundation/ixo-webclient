import React from 'react'
import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  options: any
  value: string
  onChange: (value: string) => void
}

const AvatarUpload: React.FunctionComponent<Props> = ({
  options: { savingFormData },
  value,
  onChange,
}) => {
  return (
    <ImageLoader
      uploadedImageSrc={value}
      uploading={savingFormData}
      handleSave={(base64EncodedImage): void => onChange(base64EncodedImage)}
      imageWidth={100}
    />
  )
}

export default AvatarUpload
