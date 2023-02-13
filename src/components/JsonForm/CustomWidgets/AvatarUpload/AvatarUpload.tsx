import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  options: any
  value: string
  onChange: (value: string) => void
}

const AvatarUpload: React.FunctionComponent<Props> = ({ options: { uploading }, value, onChange }) => {
  return (
    <ImageLoader
      keepCropSelection={false}
      circularCrop={true}
      aspect={1}
      uploadedImageSrc={value}
      uploading={uploading}
      handleSave={(base64EncodedImage): void => onChange(base64EncodedImage)}
      maxDimension={600}
    />
  )
}

export default AvatarUpload
