import { Badge, Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { theme } from 'components/App/App.styles'

interface ClaimsListProps {
  applicationStatus?: string
  claims?: {
    total: number
    pending: number
    approved: number
    disputed: number
    rejected: number
  }
}

const colors = {
  pending: theme.ixoBlue,
  approved: theme.ixoGreen,
  disputed: theme.ixoDarkOrange,
  rejected: theme.rejected,
}

const ClaimCard = ({ status, count }: { status: keyof typeof colors; count: number }) => (
  <Badge
    c='black'
    leftSection={<Box bg={colors[status]} h='12' w='12' style={{ borderRadius: '100%' }} />}
    color='#F9F9F9'
    p={'sm'}
    size='lg'
    w='100%'
    style={{ justifyContent: 'start' }}
  >
    {count} {status}
  </Badge>
)

function ClaimsList({ applicationStatus, claims }: ClaimsListProps) {
  return (
    <ActionCard title='Claims' icon={<ClaimIcon />}>
      <Flex w='100%' align='center' p='sm' style={{ borderRadius: '10px' }}>
        {!claims ? (
          <ClaimApplication status={applicationStatus} />
        ) : (
          <Stack gap={'md'} w={'100%'}>
            <Flex w='100%' gap={'md'} align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.28027 12.0002C2.28027 6.63155 6.63155 2.28027 12.0002 2.28027C17.3688 2.28027 21.7201 6.63155 21.7201 12.0002C21.7201 17.3688 17.3688 21.7201 12.0002 21.7201C6.63155 21.7201 2.28027 17.3688 2.28027 12.0002ZM19.9527 12.0002C19.9527 7.61488 16.3855 4.04768 12.0002 4.04768C7.61488 4.04768 4.04768 7.61488 4.04768 12.0002C4.04768 16.3855 7.61488 19.9527 12.0002 19.9527C16.3855 19.9527 19.9527 16.3855 19.9527 12.0002Z'
                  fill='#9A9A9A'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12.0004 8.84999C10.2607 8.84999 8.85039 10.2603 8.85039 12C8.85039 13.7397 10.2607 15.15 12.0004 15.15C13.7401 15.15 15.1504 13.7397 15.1504 12C15.1504 10.2603 13.7401 8.84999 12.0004 8.84999ZM7.15039 12C7.15039 9.32141 9.32181 7.14999 12.0004 7.14999C14.679 7.14999 16.8504 9.32141 16.8504 12C16.8504 14.6786 14.679 16.85 12.0004 16.85C9.32181 16.85 7.15039 14.6786 7.15039 12Z'
                  fill='#9A9A9A'
                />
              </svg>

              <div>
                <Text fs={'14px'} c='black'>
                  {claims.total} Claims
                  <Text c='#9A9A9A' fs={'10px'}>
                    Submitted in Total
                  </Text>
                </Text>
              </div>
            </Flex>
            <SimpleGrid cols={2} spacing='md'>
              {Object.entries(claims).map(
                ([status, count]) =>
                  status !== 'total' && <ClaimCard key={status} status={status as keyof typeof colors} count={count} />,
              )}
            </SimpleGrid>
          </Stack>
        )}
      </Flex>
    </ActionCard>
  )
}

const ClaimApplication = ({ status }: { status?: string }) => (
  <Flex w='100%' gap={4} align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
    <ClaimIcon color={'#9A9A9A'} />
    <Box>
      <Text>{status === 'pending' ? 'Apply to submit claims' : 'Application Pending'}</Text>
    </Box>
  </Flex>
)

interface ClaimsIconProps {
  color?: string
}
const ClaimIcon = ({ color = '#00D2FF' }: ClaimsIconProps) => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.52051 8.00011C1.52051 4.42102 4.42136 1.52017 8.00044 1.52017C11.5795 1.52017 14.4804 4.42102 14.4804 8.00011C14.4804 11.5792 11.5795 14.48 8.00044 14.48C4.42136 14.48 1.52051 11.5792 1.52051 8.00011ZM13.3021 8.00011C13.3021 5.07658 10.924 2.69844 8.00044 2.69844C5.07691 2.69844 2.69878 5.07658 2.69878 8.00011C2.69878 10.9236 5.07691 13.3018 8.00044 13.3018C10.924 13.3018 13.3021 10.9236 13.3021 8.00011Z'
      fill={color}
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.99993 5.9C6.84014 5.9 5.89993 6.8402 5.89993 8C5.89993 9.15979 6.84014 10.1 7.99993 10.1C9.15973 10.1 10.0999 9.15979 10.0999 8C10.0999 6.8402 9.15973 5.9 7.99993 5.9ZM4.7666 8C4.7666 6.21428 6.21421 4.76666 7.99993 4.76666C9.78566 4.76666 11.2333 6.21428 11.2333 8C11.2333 9.78572 9.78566 11.2333 7.99993 11.2333C6.21421 11.2333 4.7666 9.78572 4.7666 8Z'
      fill={color}
    />
  </svg>
)

export default ClaimsList
