import { Flex } from '@mantine/core'
import Editor from 'components/Editor/Editor'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const Page = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { page } = useAppSelector(getEntityById(entityId))

  if (!page) return null

  return (
    <Flex>
      {Array.isArray(page) ? (
        <Editor initialPage={EditorJsToBlockNote(page)} />
      ) : (
        <Editor initialPage={page} editable={false} />
      )}
    </Flex>
  )
}

export default Page
