// @ts-nocheck
import Image from '@editorjs/image'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import { convertFileToBase64 } from 'utils/images'
import { customQueries } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'

const CustomImage: ToolConstructable | ToolSettings = {
  class: Image,
  config: {
    uploader: {
      /**
       * Upload file to the server and return an uploaded image data
       * @param {File} file - file selected from the device or pasted by drag-n-drop
       * @return {Promise.<{success, file: {url}}>}
       */
      uploadByFile: async (file: any) => {
        // your own uploading logic here
        const base64EncodedImage = await convertFileToBase64(file)

        return await customQueries.cellnode
          .uploadPublicDoc(
            base64EncodedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
            base64EncodedImage,
            undefined,
            chainNetwork,
          )
          .then((response: any) => {
            if (!response?.key) {
              throw new Error(`Key doesn't exist`)
            }
            return { success: true, file: { url: response.url } }
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
}

export default CustomImage
