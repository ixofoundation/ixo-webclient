import { forwardRef } from 'react'
import { Flex, Text, TextInput } from '@mantine/core'

type PageTitleProps = {
  initialTitle?: string
  editable?: boolean
}

const PageTitle = forwardRef<HTMLInputElement, PageTitleProps>(({ initialTitle, editable }, ref) => {
  return (
    <Flex align='center' gap={6} py={10} mx={50}>
      {editable ? (
        <TextInput
          ref={ref}
          defaultValue={initialTitle}
          styles={{ input: { fontSize: 32, lineHeight: '80px', padding: '0.9em 0' } }}
          variant='unstyled'
          placeholder='Add Page Title'
        />
      ) : (
        <Text fz={32} maw='750px' style={{ textWrap: 'wrap' }}>
          {initialTitle}
        </Text>
      )}
    </Flex>
  )
})

PageTitle.displayName = 'PageTitle'

export default PageTitle
