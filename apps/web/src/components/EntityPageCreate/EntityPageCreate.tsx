import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { Box, Button, Flex } from '@mantine/core'
import PageTitle from 'components/Editor/PageTitle/PageTitle'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import { useRef } from 'react'
import { TEntityPageModel } from 'types/entities'
import { uploadFile } from 'components/Editor/uploadFile'
import { en } from 'components/Editor/customDictionary'
import 'components/Editor/Editor.css'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
  },
})

type EntityPageCreateProps = {
  onChange: (page: TEntityPageModel) => void
  page?: TEntityPageModel
  onClose: () => void
}

const EntityPageCreate = ({ onChange, page, onClose }: EntityPageCreateProps) => {
  const pageTitleRef = useRef<HTMLInputElement>(null)

  const editor = useCreateBlockNote({
    schema,
    initialContent: EditorJsToBlockNote(page),
    uploadFile,
    dictionary: en,
  })

  const onDone = () => {
    const newPage: TEntityPageModel = {
      pageTitle: pageTitleRef.current?.value || '',
      content: editor.document as Block[],
    }
    onChange(newPage)
  }

  return (
    <Flex pos={'relative'} px={60}>
      <Box w='100%'>
        <Flex justify='flex-end'>
          <Box className='d-flex' style={{ gap: 20 }}>
            <Button size='md' w='160' radius={'sm'} variant='outline' onClick={onClose}>
              Back
            </Button>
            <Button size='md' w='160' radius={'sm'} variant='primary' onClick={onDone}>
              Continue
            </Button>
          </Box>
        </Flex>
        <PageTitle editable={true} ref={pageTitleRef} initialTitle={page?.pageTitle} />
        <BlockNoteView editable={true} editor={editor} theme={'light'} />
      </Box>
    </Flex>
  )
}

export default EntityPageCreate
