import React from 'react'
import { Box, theme, Typography } from 'common/components/App/App.styles'
import {
  AssetCardBody,
  AssetCardBodyRow,
  AssetCardHeader,
  AssetCardHeaderDotBG,
  AssetCardHeaderLogo,
  AssetCardSelection,
  AssetCardWrapper,
  AssetLogo,
} from './AssetCard.styles'
import SuperMotoSVG from 'assets/nfts/SuperMoto.svg'
import { ReactComponent as IconCheck } from 'assets/images/icon-check-big.svg'
import { CardTag, CardTags } from '../EntityCard/EntityCard.styles'
import { ProgressBar } from 'common/components/ProgressBar'

interface Props {
  active?: boolean
  selected?: boolean
  isSelecting?: boolean
  onClick: () => void
}

const AssetCard: React.FC<Props> = ({
  active = false,
  selected = false,
  isSelecting = false,
  onClick,
  ...rest
}): JSX.Element => {
  const image = 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c'
  const logo = 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j'

  return (
    <AssetCardWrapper active={active} onClick={onClick} {...rest}>
      {isSelecting && <AssetCardSelection selected={selected}>{selected && <IconCheck />}</AssetCardSelection>}

      <AssetCardHeader background={image}>
        <AssetCardHeaderDotBG />
        <AssetCardHeaderLogo src={SuperMotoSVG} alt='' />
      </AssetCardHeader>

      <AssetCardBody>
        <AssetCardBodyRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTags style={{ gap: 5 }}>
            <CardTag tagColor={theme.ixoDarkRed}>Inventory</CardTag>
            <CardTag tagColor={theme.ixoNewOrange}>Clean CookStove</CardTag>
          </CardTags>
          <AssetLogo src={logo} alt='' />
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', height: 70 }}>
          <Typography color='#01283B' fontWeight={700} fontSize='23px' lineHeight='24px' style={{ marginBottom: 4 }}>
            SuperMoto Clean Cooking
          </Typography>
          <Typography color='#828E94' fontWeight={400} fontSize='14px' lineHeight='16px'>
            Malawi Collection 2022
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', gap: 4 }}>
          <ProgressBar
            total={100}
            approved={33}
            rejected={0}
            activeBarColor={'linear-gradient(270deg, #6FCF97 50%, #036784 100%)'}
            height={9}
          />
          <Box className='d-flex'>
            <Typography fontWeight={700} color={theme.ixoNewBlue}>
              124.12&nbsp;
            </Typography>
            <Typography fontWeight={700} color={theme.ixoBlack}>
              CARBON&nbsp;
            </Typography>
            <Typography fontWeight={400} color={theme.ixoBlack}>
              claimed ~&nbsp;
            </Typography>
            <Typography fontWeight={700} color={theme.ixoBlack}>
              1,23k&nbsp;
            </Typography>
            <Typography fontWeight={400} color={theme.ixoBlack}>
              produced
            </Typography>
          </Box>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
          <Typography color='#01283B' fontWeight={600} fontSize='23px' lineHeight='27px'>
            #101
          </Typography>
          <Typography color='#828E94' fontWeight={500} fontSize='14px' lineHeight='16px'>
            of 3,000
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ justifyContent: 'space-between' }}>
          <Typography color='#828E94' fontWeight={400} fontSize='14px' lineHeight='16px'>
            31/09/2022
          </Typography>
          <Typography color='#01283B' fontWeight={400} fontSize='14px' lineHeight='16px'>
            $ 230.00
          </Typography>
        </AssetCardBodyRow>
      </AssetCardBody>
    </AssetCardWrapper>
  )
}

export default AssetCard
