import DownloadDocument from 'assets/icons/DownloadDocument'
import DownloadAudio from 'assets/icons/DownloadAudio'
import DownloadVideo from 'assets/icons/DownloadVideo'
import { FileType } from './types'

export const strategyMap = {
  [FileType.Document]: {
    mimeType:
      'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/json',
    newMimeType: {
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/docx': [],
      'application/pdf': [],
      'text/plain': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/json': [],
    },
    downloadIcon: DownloadDocument,
    fileTypesText: 'document',
    uploadButtonText: 'Choose a Document',
    replaceButtonText: 'Replace Document',
  },
  [FileType.Video]: {
    mimeType: 'video/*',
    newMimeType: {
      'video/*': [],
    },
    downloadIcon: DownloadVideo,
    fileTypesText: 'video file',
    uploadButtonText: 'Choose a Video',
    replaceButtonText: 'Replace Video File',
  },
  [FileType.Audio]: {
    mimeType: 'audio/*',
    newMimeType: {
      'audio/*': [],
    },
    downloadIcon: DownloadAudio,
    fileTypesText: 'audio clip',
    uploadButtonText: 'Choose an Audio Clip',
    replaceButtonText: 'Replace Audio Clip',
  },
  [FileType.Image]: {
    mimeType: 'image/*',
    newMimeType: {
      'image/*': [],
    },
    fileTypesText: 'jpeg/png image',
    downloadIcon: DownloadAudio,
    uploadButtonText: 'Choose an Image',
    replaceButtonText: 'Replace Image',
  },
  [FileType.Any]: {
    mimeType: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/docx',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
      'image/*',
    ],
    newMimeType: {
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/docx': [],
      'application/pdf': [],
      'text/plain': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/json': [],
      'image/*': [],
    },
    fileTypesText: 'Any file',
    downloadIcon: DownloadDocument,
    uploadButtonText: 'Choose a File',
    replaceButtonText: 'Replace File',
  },
}
