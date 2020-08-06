import React from 'react'
import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  options: any
  onChange: (value: string) => void
}

const ImageUpload: React.FunctionComponent<Props> = ({
  options: { uploading, imageSrc },
  onChange,
}) => {
  return (
    <ImageLoader
      keepCropSelection={true}
      circularCrop={false}
      uploadedImageSrc={imageSrc}
      uploading={uploading}
      handleSave={(base64EncodedImage): void => onChange(base64EncodedImage)}
      maxDimension={600}
    />
  )
}

export default ImageUpload
