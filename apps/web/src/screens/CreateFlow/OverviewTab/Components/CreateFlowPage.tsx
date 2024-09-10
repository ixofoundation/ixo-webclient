import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { Box, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionCard } from 'components/ActionCard'
import PageTitle from 'components/Editor/PageTitle/PageTitle'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import { useRef, useMemo } from 'react'
import { LiaGlobeSolid } from 'react-icons/lia'
import { updateLinkedResource } from 'redux/createFlow/slice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { TEntityPageModel } from 'types/entities'
import { uploadFile } from 'components/Editor/uploadFile'
import { en } from 'components/Editor/customDictionary'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
  },
})

const CreateFlowPage = () => {
  const dispatch = useAppDispatch()
  const [isEditing, { open: openEditing, close: closeEditing }] = useDisclosure()
  const { linkedResource } = useAppSelector((state) => state.createFlow)
  const pageTitleRef = useRef<HTMLInputElement>(null)

  const pageResource = useMemo(() => {
    return linkedResource.find((resource) => resource.id === '{id}#page')
  }, [linkedResource])

  const data = pageResource?.data

  const editor = useCreateBlockNote({
    schema,
    initialContent: EditorJsToBlockNote(data?.page ?? undefined) ?? undefined,
    uploadFile,
    dictionary: en,
  })

  const updatePage = (page: TEntityPageModel) => {
    if (!page) return
    dispatch(
      updateLinkedResource({
        id: '{id}#page',
        type: 'Settings',
        proof: '',
        description: pageResource?.description ?? 'Page',
        mediaType: 'application/ld+json',
        serviceEndpoint: pageResource?.serviceEndpoint ?? '',
        encrypted: 'false',
        right: '',
        data: { ...data, page },
      }),
    )
  }

  const onDone = () => {
    const newPage: TEntityPageModel = {
      pageTitle: pageTitleRef.current?.value || '',
      content: editor.document as Block[],
    }
    updatePage(newPage)
    closeEditing()
  }

  return (
    <Flex pos={'relative'} px={60}>
      <ActionCard
        title='Page'
        icon={<LiaGlobeSolid />}
        isEditing={isEditing}
        onClose={onDone}
        onOpen={openEditing}
        closingLabel='Save changes'
      >
        <Box w='100%'>
          <PageTitle editable={isEditing} ref={pageTitleRef} initialTitle={data?.page?.pageTitle} />
          <BlockNoteView editable={isEditing} editor={editor} theme={'light'} />
        </Box>
      </ActionCard>
    </Flex>
  )
}

export default CreateFlowPage
