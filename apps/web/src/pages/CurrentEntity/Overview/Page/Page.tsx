import { Flex } from '@mantine/core'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'
import EntityPageDisplay from 'components/EntityPageDisplay/EntityPageDisplay'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityFromStoreById } from 'redux/entitiesState/entitiesState.selectors'
import { useAppSelector } from 'redux/hooks'

const Page = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityFromStoreById(entityId))
  const pageData = entity?.settings?.Page.data
  const page = pageData?.page

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
