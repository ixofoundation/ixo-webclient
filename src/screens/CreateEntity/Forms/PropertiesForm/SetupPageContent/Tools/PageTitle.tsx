// @ts-nocheck
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import Header from '@editorjs/header'

const PageTitle: ToolConstructable | ToolSettings = {
  class: Header,
  config: {
    placeholder: 'Page Title',
    levels: [1],
    defaultLevel: 1,
  },
}

export default PageTitle
