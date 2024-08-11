import { Flex } from '@mantine/core'
import Editor from 'components/Editor/Editor'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const Page = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { page } = useAppSelector(getEntityById(entityId))

  console.log({ page })

  if (!page) return null

  return (
    <Flex>
      {Array.isArray(page) ? (
        <Editor initialPage={EditorJsToBlockNote(page)} initialTitle={page.pageTitle} />
      ) : (
        <Editor initialPage={page.content} editable={false} />
      )}
    </Flex>
  )
}

export default Page
