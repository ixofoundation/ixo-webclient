// @ts-nocheck
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import CustomImage from './Tools/CustomImage'
import HeroImage from './Tools/HeroImage'
import PageTitle from './Tools/PageTitle'
import PageContent from './Tools/PageContent'

export const EDITOR_JS_TOOLS: {
  [toolName: string]: ToolConstructable | ToolSettings
} = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: CustomImage,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  heroImage: HeroImage,
  pageTitle: PageTitle,
  pageContent: PageContent,
}
