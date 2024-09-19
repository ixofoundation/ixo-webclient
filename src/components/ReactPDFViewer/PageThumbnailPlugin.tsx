import type { Plugin, RenderViewer } from '@react-pdf-viewer/core'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'

export interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement
}

export const createPageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props

  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps

      slot.children = PageThumbnail

      // Reset the sub slot
      if (slot.subSlot) {
        slot.subSlot.attrs = {}
        slot.subSlot.children = <></>
      }

      return slot
    },
  }
}

export const createPlugins = () => {
  const thumbnailPluginInstance = thumbnailPlugin()
  const { Cover } = thumbnailPluginInstance

  const pageThumbnailPluginInstance = createPageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} />,
  })

  return [thumbnailPluginInstance, pageThumbnailPluginInstance]
}
