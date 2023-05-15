import { FlexBox, GridContainer } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AccountCard from './AccountCard/AccountCard'
import AccountCardTag from './AccountCard/AccountCardTag'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { truncateString } from 'utils/formatters'
import { isIxoAccount } from 'utils/account'

const LinkedAccounts: React.FC = () => {
  const accounts = [
    'ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm965',
    'osmo1xy5ej0fyap2sef3l3kux8kslcjqlc89cjn37ud',
    'regen1xc798xnhp7yy9mpp80v3tsxppw8qk0y9auwtgr',
  ]
  const history = useHistory()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')

  const [selectedAcccount, setSelectedAccount] = useState(accounts[0])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <GridContainer columns={2} gridGap={6} width='100%'>
        <AccountCard address={selectedAcccount} />

        <FlexBox gap={4} width='100%' height='fit-content' flexWrap='wrap'>
          {accounts
            .filter((account) => account !== selectedAcccount)
            .map((account) => (
              <AccountCardTag key={account} address={account} onClick={() => setSelectedAccount(account)} />
            ))}
        </FlexBox>
      </GridContainer>

      <FlexBox>
        <Typography variant='secondary' size='2xl'>
          {truncateString(selectedAcccount, 20, 'middle')}
        </Typography>
      </FlexBox>

      {/* Grid Layout  */}
      <GridContainer columns={2} gridGap={6} width='100%' style={expand ? { display: 'none' } : {}}>
        <FlexBox>
          <Card
            label='Coins'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
          >
            <Coins address={selectedAcccount} />
          </Card>
        </FlexBox>
        {isIxoAccount(selectedAcccount) && (
          <>
            <FlexBox>
              <Card
                label='Impact Tokens'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
              >
                <ImpactTokens address={selectedAcccount} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Collections'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
              >
                <Collections address={selectedAcccount} />
              </Card>
            </FlexBox>
          </>
        )}
        <FlexBox>
          <Card
            label='Transactions'
            onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
          >
            <Transactions address={selectedAcccount} />
          </Card>
        </FlexBox>
      </GridContainer>

      {/* Coins expanded view */}
      {expand === 'coins' && (
        <FlexBox width='100%'>
          <Card label='Coins' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
            <Coins address={selectedAcccount} />
          </Card>
        </FlexBox>
      )}

      {/* Impact Tokens expanded view */}
      {expand === 'impact_tokens' && (
        <FlexBox width='100%'>
          <Card label='Impact Tokens' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
            <ImpactTokens address={selectedAcccount} />
          </Card>
        </FlexBox>
      )}

      {/* Collections expanded view */}
      {expand === 'collections' && (
        <FlexBox width='100%'>
          <Card label='Collections' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
            <Collections address={selectedAcccount} />
          </Card>
        </FlexBox>
      )}

      {/* Transactions expanded view */}
      {expand === 'transactions' && (
        <FlexBox width='100%'>
          <Card label='Transactions' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
            <Transactions address={selectedAcccount} />
          </Card>
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default LinkedAccounts
