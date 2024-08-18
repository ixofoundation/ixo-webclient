import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { Box, Text } from '@mantine/core'
import { ImageBlock } from 'components/Editor/CustomBlocks/Image/ImageBlock'
import { en } from 'components/Editor/customDictionary'
import { uploadFile } from 'components/Editor/uploadFile'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    heroImage: ImageBlock,
  },
})

const EntityPageDisplay = ({ pageTitle, content }: { pageTitle?: string; content?: Block[] }) => {
  const editor = useCreateBlockNote({
    schema,
    initialContent: content?.length ? content : undefined,
    uploadFile,
    dictionary: en,
  })

  return (
    <Box>
      <Text ml={50} fw={500} fz={32} mb={30}>
        {pageTitle}
      </Text>
      <BlockNoteView editable={false} editor={editor} theme={'light'} />
    </Box>
  )
}

export default EntityPageDisplay
