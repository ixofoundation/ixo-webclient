// @ts-nocheck
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'

const PageContent: ToolConstructable | ToolSettings = {
  class: Paragraph,
  config: {
    placeholder: 'Start writing content here...',
  },
}

export default PageContent
