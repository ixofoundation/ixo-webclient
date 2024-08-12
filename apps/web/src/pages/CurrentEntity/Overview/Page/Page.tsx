import { Flex } from '@mantine/core'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import EntityPageDisplay from 'components/EntityPageDisplay/EntityPageDisplay'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const Page = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { page } = useAppSelector(getEntityById(entityId))

  const { pageTitle, content } = useMemo(() => {
    return {
      pageTitle: page?.pageTitle ?? '',
      content: EditorJsToBlockNote(page),
    }
  }, [page])

  if (!page) return null

  return (
    <Flex>
      <EntityPageDisplay pageTitle={pageTitle} content={content} />
    </Flex>
  )
}

export default Page
