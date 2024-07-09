import { Flex, Text, TextInput } from '@mantine/core'

type PageTitleProps = {
  onChange: (title: string) => void
  initialTitle?: string
  editable?: boolean
}

const PageTitle = ({ onChange, initialTitle, editable }: PageTitleProps) => {
  return (
    <Flex align='center' gap={6} py={10}>
      {editable && (
        <TextInput
          value={initialTitle}
          styles={{ input: { fontSize: 60, lineHeight: '80px', padding: '0.9em 0' } }}
          variant='unstyled'
          placeholder='Page Title'
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      )}
      {!editable && (
        <Text fz={60} mx='auto' maw='750px' style={{ textWrap: 'wrap' }}>
          {initialTitle}
        </Text>
      )}
    </Flex>
  )
}

export default PageTitle
