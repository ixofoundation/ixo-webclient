import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import EventsHistory from './EventsHistory'

const Events: React.FC = () => {
  const onNewContract = () => {
    //
  }

  return (
    <FlexBox $direction='column' $gap={6} width='100%' color='white'>
      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
        <Typography variant='secondary' size='2xl'>
          Funding Events
        </Typography>
        <Button variant='secondary' size='flex' onClick={onNewContract} textTransform='capitalize'>
          New Event
        </Button>
      </FlexBox>

      <EventsHistory />
    </FlexBox>
  )
}

export default Events
