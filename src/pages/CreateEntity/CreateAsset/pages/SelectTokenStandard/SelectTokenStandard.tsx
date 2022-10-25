import { Box, theme, Typography } from 'modules/App/App.styles'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import {
  OptionBox,
  OptionRadio,
  PageWrapper,
  Selections,
} from './SelectTokenStandard.styles'

export enum TokenStandards {
  CW20 = 'Fungible Token',
  CW721 = 'Non-Fungible Token',
  IXO1155 = 'Impact Token',
  IXO721 = 'InterNFT',
}

const SelectTokenStandard: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [tokenStandard, setTokenStandard] = useState<
    TokenStandards | undefined
  >(undefined)

  const handleBack = (): void => history.goBack()
  const handleContinue = (): void =>
    history.push('/create/entity/asset/attribute')

  return (
    <PageWrapper>
      <Typography
        fontFamily={theme.secondaryFontFamily}
        fontWeight={400}
        fontSize="24px"
        lineHeight="28px"
        color={theme.ixoBlack}
        style={{ letterSpacing: 0.3 }}
      >
        Which token standard do you want to use for this asset class?
      </Typography>

      <Selections>
        {Object.entries(TokenStandards).map(([key, value]) => (
          <OptionBox key={key} onClick={(): void => setTokenStandard(value)}>
            <OptionRadio checked={tokenStandard === value} />
            <Typography
              fontFamily={theme.secondaryFontFamily}
              fontWeight={700}
              fontSize="20px"
              lineHeight="23px"
              style={{ letterSpacing: 0.3 }}
            >
              {value} ({key})
            </Typography>
          </OptionBox>
        ))}
      </Selections>

      <Box className="d-flex" style={{ gap: 20 }}>
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleContinue}
          disabled={!tokenStandard}
        >
          Continue
        </Button>
      </Box>
    </PageWrapper>
  )
}

export default SelectTokenStandard
