import ResourceLoader from '../../../DropZone/ResourceLoader/ResourceLoader'
import { FileType } from '../../../DropZone/types'

interface Props {
  value: string
  options: any
  onChange: (value?: string) => void
}

const FileUpload: React.FunctionComponent<Props> = ({ value, options: { uploading, path }, onChange }) => {
  return (
    <ResourceLoader
      maxFileSize={5000000}
      fileType={FileType.Any}
      uploadedFileSrc={value}
      uploading={uploading}
      path={path}
      handleSave={(base64EncodedFile): void => {
        onChange(base64EncodedFile)
      }}
    />
  )
}

export default FileUpload
