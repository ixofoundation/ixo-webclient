import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button } from 'screens/CreateEntity/Components'
import PaymentPays from './PaymentPays'
import PaymentReceives from './PaymentReceives'

const Payments: React.FC = () => {
  const onNewContract = () => {
    //
  }

  return (
    <FlexBox $direction='column' $gap={6} width='100%' color='white'>
      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
        <Typography variant='secondary' size='2xl'>
          Contracts to pay
        </Typography>
        <Button variant='secondary' size='flex' onClick={onNewContract} textTransform='capitalize'>
          New Contract
        </Button>
      </FlexBox>

      <PaymentPays />

      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
        <Typography variant='secondary' size='2xl'>
          Contracts to receive payments
        </Typography>
      </FlexBox>

      <PaymentReceives />
    </FlexBox>
  )
}

export default Payments
