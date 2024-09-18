'use client'
import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { Box } from '@mantine/core'
import { uploadFile } from 'components/Editor/uploadFile'
import { ImageBlock } from './CustomBlocks/Image/ImageBlock'
import { en } from './customDictionary'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    heroImage: ImageBlock,
  },
})

type Props = {
  editable?: boolean
  initialPage?: Block[]
  onChange?: (page: Block[]) => void
  initialTitle?: string
  children?: React.ReactNode
}

const Editor = ({ editable = false, initialPage, onChange, children }: Props) => {
  // const editor = useCreateBlockNote({
  //   schema,
  //   initialContent: initialPage?.length ? initialPage : undefined,
  //   uploadFile,
  //   dictionary: en,
  // })

  return (
    <Box w='100%'>
      {children}
      {/* <BlockNoteView editable={editable} editor={editor} theme={'light'} /> */}
    </Box>
  )
}

export default Editor
