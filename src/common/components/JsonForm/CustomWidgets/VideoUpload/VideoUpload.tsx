import React from 'react'
import FileLoader from '../../../DropZone/FileLoader/FileLoader'
import { FileType } from '../../../DropZone/types'

interface Props {
  options: any
  value: string
  onChange: (value: string) => void
}

const VideoUpload: React.FunctionComponent<Props> = ({
  options: { savingFormData },
  value,
  onChange,
}) => {
  return (
    <FileLoader
      maxFileSize={20000000}
      fileType={FileType.Video}
      uploadedFileSrc={value}
      uploading={savingFormData}
      handleSave={(base64EncodedFile): void => onChange(base64EncodedFile)}
    />
  )
}

export default VideoUpload
