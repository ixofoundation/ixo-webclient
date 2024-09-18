import FileLoader from '../../../DropZone/FileLoader/FileLoader'
import { FileType } from '../../../DropZone/types'

interface Props {
  options: any
  value: string
  onChange: (value: string | undefined) => void
}

const VideoUpload: React.FunctionComponent<Props> = ({ options: { uploading }, value, onChange }) => {
  return (
    <FileLoader
      maxFileSize={20000000}
      fileType={FileType.Video}
      uploadedFileSrc={value}
      uploading={uploading}
      handleSave={(base64EncodedFile): void => onChange(base64EncodedFile)}
    />
  )
}

export default VideoUpload
