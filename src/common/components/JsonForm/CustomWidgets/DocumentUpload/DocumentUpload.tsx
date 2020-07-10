import React from 'react'
import FileLoader from '../../../DropZone/FileLoader/FileLoader'
import { FileType } from '../../../DropZone/types'

interface Props {
  options: any
  value: string
  onChange: (value: string) => void
}

const DocumentUpload: React.FunctionComponent<Props> = ({
  options: { savingFormData },
  value,
  onChange,
}) => {
  return (
    <FileLoader
      maxFileSize={5000000}
      fileType={FileType.Document}
      uploadedFileSrc={value}
      uploading={savingFormData}
      handleSave={(base64EncodedFile): void => onChange(base64EncodedFile)}
    />
  )
}

export default DocumentUpload
