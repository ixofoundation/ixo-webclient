import { Flex, Image } from '@mantine/core'
import Editor from 'components/Editor/Editor'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const Page = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { page } = useAppSelector(getEntityById(entityId))

  return (
    <Flex>
      {/* {page?.featuredImage && <Image src={page?.featuredImage} />} */}
      {page && <Editor initialPage={page} editable={false} />}
    </Flex>
  )
}

export default Page
