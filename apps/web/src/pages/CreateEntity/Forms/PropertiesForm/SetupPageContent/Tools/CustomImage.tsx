// @ts-nocheck
import Image from '@editorjs/image'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import { convertFileToBase64 } from 'utils/images'
import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'

const CustomImage: ToolConstructable | ToolSettings = {
  class: Image,
  config: {
    uploader: {
      uploadByFile: async (file: any) => {
        // your own uploading logic here
        const base64EncodedImage = await convertFileToBase64(file)

        try {
          const image = await customQueries.cellnode.uploadWeb3Doc(
            utils.common.generateId(12),
            `application/${base64EncodedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]}`,
            base64EncodedImage.split(',')[1],
            undefined,
            chainNetwork,
          )

          return { success: 1, file: { url: image.url } }
        } catch (error) {
          return { success: 0, file: null }
        }
      },
    },
  },
}

export default CustomImage
