import { FlexBox, GridContainer } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AccountCard from './AccountCard/AccountCard'
import AccountCardTag from './AccountCard/AccountCardTag'
import { Coins } from './Coins'
import { Collections } from './Collections'
import { ImpactTokens } from './ImpactTokens'
import { Transactions } from './Transactions'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'

const EntityAccounts: React.FC = () => {
  const accounts = [
    {
      name: 'admin',
      address: 'ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm965',
    },
    {
      name: 'reserve',
      address: 'ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm962',
    },
    {
      name: 'backup',
      address: 'ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm96d',
    },
  ]
  const history = useHistory()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')

  const [selectedAcccount, setSelectedAccount] = useState(accounts[0])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <GridContainer columns={2} gridGap={6} width='100%'>
        <AccountCard address={selectedAcccount.address} name={selectedAcccount.name} />

        <FlexBox gap={4} width='100%' height='fit-content' flexWrap='wrap'>
          {accounts
            .filter((account) => account.address !== selectedAcccount.address)
            .map((account) => (
              <AccountCardTag
                key={account.address}
                name={account.name}
                address={account.address}
                onClick={() => setSelectedAccount(account)}
              />
            ))}
        </FlexBox>
      </GridContainer>

      <FlexBox>
        <Typography variant='secondary' size='2xl' transform='capitalize'>
          {selectedAcccount.name} Account
        </Typography>
      </FlexBox>

      {/* Grid Layout  */}
      <GridContainer columns={2} gridGap={6} width='100%' style={expand ? { display: 'none' } : {}}>
        <FlexBox>
          <Card
            label='Coins'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
          >
            <Coins address={selectedAcccount.address} />
          </Card>
        </FlexBox>
        <FlexBox>
          <Card
            label='Impact Tokens'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
          >
            <ImpactTokens address={selectedAcccount.address} />
          </Card>
        </FlexBox>
        <FlexBox>
          <Card
            label='Collections'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
          >
            <Collections address={selectedAcccount.address} />
          </Card>
        </FlexBox>
        <FlexBox>
          <Card
            label='Transactions'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
          >
            <Transactions address={selectedAcccount.address} />
          </Card>
        </FlexBox>
      </GridContainer>

      {/* Coins expanded view */}
      <FlexBox width='100%' style={expand !== 'coins' ? { display: 'none' } : {}}>
        <Card label='Coins' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
          <Coins address={selectedAcccount.address} />
        </Card>
      </FlexBox>

      {/* Impact Tokens expanded view */}
      <FlexBox width='100%' style={expand !== 'impact_tokens' ? { display: 'none' } : {}}>
        <Card label='Impact Tokens' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
          <ImpactTokens address={selectedAcccount.address} />
        </Card>
      </FlexBox>

      {/* Collections expanded view */}
      <FlexBox width='100%' style={expand !== 'collections' ? { display: 'none' } : {}}>
        <Card label='Collections' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
          <Collections address={selectedAcccount.address} />
        </Card>
      </FlexBox>

      {/* Transactions expanded view */}
      <FlexBox width='100%' style={expand !== 'transactions' ? { display: 'none' } : {}}>
        <Card label='Transactions' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
          <Transactions address={selectedAcccount.address} />
        </Card>
      </FlexBox>
    </FlexBox>
  )
}

export default EntityAccounts
