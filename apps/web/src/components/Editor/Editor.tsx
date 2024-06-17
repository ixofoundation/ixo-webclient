import '@blocknote/core/fonts/inter.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { uploadFile } from 'components/Editor/uploadFile'
import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import { PageTitle } from 'components/Editor/PageTitle'
import { Dispatch, SetStateAction } from 'react'
import './Editor.css'
import { ImageBlock } from './Image/ImageBlock'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    pageTitle: PageTitle,
    heroImage: ImageBlock
  },
})

type Props = {
  editable?: boolean
  initialBlocks?: Block[]
  onChange?: Dispatch<SetStateAction<Block[]>>
}
const Editor = ({ editable = false, onChange, initialBlocks }: Props) => {
  const initialContent: any = editable ? [
    {
      type: 'heroImage',
    },
    {
      type: 'heading',
    },
  ] : initialBlocks
  const editor = useCreateBlockNote({
    schema,
    initialContent,
    uploadFile,
  })

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      onChange={() => {
        onChange && onChange(editor?.document as Block[])
      
      }}
    />
  )
}

export default Editor
