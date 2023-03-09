// @ts-nocheck
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { convertFileToBase64 } from 'utils/images'
import { PDS_URL } from 'types/entities'
import blocksyncApi from 'api/blocksync/blocksync'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile: async (file) => {
          // your own uploading logic here
          const base64EncodedImage = await convertFileToBase64(file)
          console.log({ base64EncodedImage })
          // return { success: true, file: { url: 'https://asdf.com' } }
          return blocksyncApi.project
            .createPublic(base64EncodedImage, PDS_URL!)
            .then((response: any) => response?.result?.key)
            .then((key: string) => {
              if (!key) {
                throw new Error(`Key doesn't exist`)
              }
              return { success: true, file: { url: `${PDS_URL}/public/${key}` } }
            })
            .catch((e) => ({ success: false }))
        },
        /**
         * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
         * @param {string} url - pasted image URL
         * @return {Promise.<{success, file: {url}}>}
         */
        // uploadByUrl(url) {
        //   // your ajax request for uploading
        //   return MyAjax.upload(file).then(() => {
        //     return {
        //       success: 1,
        //       file: {
        //         url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
        //         // any other image data you want to store, such as width, height, color, extension, etc
        //       },
        //     }
        //   })
        // },
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
