import { ActionIcon, Paper, Text } from '@mantine/core'
import { LiaArrowRightSolid } from 'react-icons/lia'
import classes from './SearchSuggestion.module.css'

export const SearchSuggestion = ({ description, information }: { description: string; information: string }) => {
  return (
    <Paper radius='md' p='md' bg='gray.1' w='100%' className={classes.searchSuggestion}>
      <Text>{description}</Text>
      <Text c='dimmed' size='sm' mt={10}>
        {information}
      </Text>
      <ActionIcon variant='transparent' color='gray' mt={10}>
        <LiaArrowRightSolid size={20} />
      </ActionIcon>
    </Paper>
  )
}
