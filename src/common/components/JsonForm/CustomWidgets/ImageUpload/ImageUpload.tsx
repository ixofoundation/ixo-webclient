import React from 'react'
import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  options: any
  value: string
  onChange: (value: string) => void
}

const ImageUpload: React.FunctionComponent<Props> = ({
  options: { savingFormData },
  value,
  onChange,
}) => {
  return (
    <ImageLoader
      keepCropSelection={true}
      circularCrop={false}
      uploadedImageSrc={value}
      uploading={savingFormData}
      handleSave={(base64EncodedImage): void => onChange(base64EncodedImage)}
      maxDimension={600}
    />
  )
}

export default ImageUpload
