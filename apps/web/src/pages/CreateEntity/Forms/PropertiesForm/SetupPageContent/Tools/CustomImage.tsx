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
      uploadByFile: async (file: any) => {
        // your own uploading logic here
        const base64EncodedImage = await convertFileToBase64(file)

        return await customQueries.cellnode.uploadPublicDoc(
          base64EncodedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
          base64EncodedImage,
          undefined,
          chainNetwork,
        ).then((response: any) => {
          if (!response?.key) {
            throw new Error(`Key doesn't exist`)
          }
          return { success: true, file: { url: response.url }}
        })
        .catch((e) => ({ success: false }))
      },
    },
  },
}

export default CustomImage
