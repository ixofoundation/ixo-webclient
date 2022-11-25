import { Box, theme, Typography } from 'modules/App/App.styles'
import cx from 'classnames'
import React, { useMemo, useState } from 'react'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-ixo1155.svg'
import { ReactComponent as InterNFTIcon } from 'assets/images/icon-ixo721.svg'
import { ReactComponent as NFTIcon } from 'assets/images/icon-cw721.svg'
import { ReactComponent as FTIcon } from 'assets/images/icon-cw20.svg'
import { ReactComponent as CloneIcon } from 'assets/images/icon-asset-clone.svg'
import {
  OptionBox,
  PageWrapper,
  PageRow,
  Selections,
  SearchIcon,
  SearchInputStyles,
} from './SelectCreationProcess.styles'
import { ETokenType } from 'types'
import { Button, ChainSelector, Input } from 'pages/CreateEntity/components'
import { useCreateEntityState } from 'states/createEntity/createEntity.hooks'

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const { gotoStep } = useCreateEntityState()
  const [isClone, setIsClone] = useState(false)
  const [existingDid, setExistingDid] = useState('')
  const [chainId, setChainId] = useState(undefined)

  const canClone = useMemo(() => existingDid.length > 0, [existingDid])

  const handleCreate = (type: ETokenType): void => {
    // store token type in Redux
    console.log('TODO:', type)
    gotoStep(1)
  }

  const handleClone = (): void => {
    console.log('TODO:', existingDid)
    gotoStep(1)
  }

  return (
    <PageWrapper>
      <PageRow>
        <Typography
          fontFamily={theme.secondaryFontFamily}
          fontWeight={400}
          fontSize='24px'
          lineHeight='28px'
          color={theme.ixoBlack}
        >
          An Asset Class defines a collection of tokens that share the same properties.
        </Typography>
      </PageRow>
      <PageRow>
        <Typography
          fontFamily={theme.secondaryFontFamily}
          fontWeight={700}
          fontSize='24px'
          lineHeight='28px'
          color={theme.ixoBlack}
        >
          Start by cloning an existing Asset Class or choose a Token Type (or Template)
        </Typography>
      </PageRow>

      <PageRow style={{ alignItems: 'stretch', gap: 16 }}>
        <OptionBox className={cx({ active: isClone })} onClick={(): void => setIsClone((pre) => !pre)}>
          <CloneIcon />
        </OptionBox>
        {isClone && (
          <Box className='d-flex flex-column justify-content-between'>
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='24px' lineHeight='28px'>
              Clone
            </Typography>
            <Box className='d-flex align-items-center' style={{ gap: 16 }}>
              <ChainSelector chainId={chainId!} onChange={setChainId as any} />
              <Input
                inputValue={existingDid}
                handleChange={setExistingDid}
                placeholder='Type to Search or enter a DID'
                preIcon={<SearchIcon />}
                width='400px'
                height='48px'
                style={SearchInputStyles}
              />
              <Button onClick={handleClone} disabled={!canClone}>
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </PageRow>

      <Selections>
        <OptionBox className={cx({ active: isClone })} onClick={(): void => setIsClone((pre) => !pre)}>
          <EntityIcon />
          <Box className='text-center label'>
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='24px' lineHeight='28px'>
              Token
              <br />
              Template
            </Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.IXO1155)}>
          <ImpactTokenIcon />
          <Box className='text-center label'>
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='24px' lineHeight='28px'>
              ImpactToken
            </Typography>
            <br />
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='16px' lineHeight='19px'>
              (IXO1155)
            </Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.IXO721)}>
          <InterNFTIcon />
          <Box className='text-center label'>
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='24px' lineHeight='28px'>
              InterNFT
            </Typography>
            <br />
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='16px' lineHeight='19px'>
              (IXO721)
            </Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.CW721)}>
          <NFTIcon />
          <Box className='text-center label'>
            <Typography
              fontFamily={theme.secondaryFontFamily}
              fontWeight={400}
              fontSize='24px'
              lineHeight='28px'
              style={{ whiteSpace: 'nowrap' }}
            >
              Non-Fungible Token
            </Typography>
            <br />
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='16px' lineHeight='19px'>
              (CW721)
            </Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.CW20)}>
          <FTIcon />
          <Box className='text-center label'>
            <Typography
              fontFamily={theme.secondaryFontFamily}
              fontWeight={400}
              fontSize='24px'
              lineHeight='28px'
              style={{ whiteSpace: 'nowrap' }}
            >
              Fungible Token
            </Typography>
            <br />
            <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='16px' lineHeight='19px'>
              (CW20)
            </Typography>
          </Box>
        </OptionBox>
      </Selections>
    </PageWrapper>
  )
}

export default SelectCreationProcess
