import { ActionIcon, Paper, Text, Flex } from '@mantine/core'
import { LiaArrowRightSolid } from 'react-icons/lia'
import classes from './SearchSuggestion.module.css'

export const SearchSuggestion = ({
  description,
  information,
  onClick,
}: {
  description: string
  information: string
  onClick: () => void
}) => {
  return (
    <Paper radius='md' p='md' bg='gray.1' w='100%' className={classes.searchSuggestion} onClick={onClick}>
      <Flex direction='column' style={{ height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <Text>{description}</Text>
          <Text c='dimmed' size='sm' mt={10}>
            {information}
          </Text>
        </div>
        <ActionIcon variant='transparent' color='gray' mt={10} style={{ alignSelf: 'flex-start' }}>
          <LiaArrowRightSolid size={20} />
        </ActionIcon>
      </Flex>
    </Paper>
  )
}
