import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import ClaimCategory from './ClaimCategory'
import ClaimItem from './ClaimItem'
import ClaimTab from './ClaimTab'

const Claims: React.FC = () => {
  return (
    <FlexBox direction='column' gap={6} width='100%' color='black'>
      <FlexBox width='100%' gap={2} color='black' flexWrap='wrap'>
        <ClaimTab status={'saved'} value={2} />
        <ClaimTab status={'pending'} value={3} />
        <ClaimTab status={'rejected'} value={18} />
        <ClaimTab status={'approved'} value={15} />
        <ClaimTab status={'disputed'} value={6} />
      </FlexBox>

      <FlexBox width='100%' gap={2} color='black' flexWrap='wrap'>
        <ClaimCategory category='Educational Pass' />
        <ClaimCategory category='Schools Built' />
        <ClaimCategory category='Teachers Trained' />
        <ClaimCategory category='Another Claim' />
        <ClaimCategory category='One More Claim' />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={6}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Saved Claims
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Pending
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            <ClaimItem status='pending' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='pending' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='pending' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Rejected
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            <ClaimItem status='rejected' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='rejected' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='rejected' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Approved
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            <ClaimItem status='approved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='approved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='approved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default Claims
