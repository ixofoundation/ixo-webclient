import React from 'react'
import { theme, Typography } from 'modules/App/App.styles'
import {
  AssetCardBody,
  AssetCardBodyRow,
  AssetCardHeader,
  AssetCardHeaderDotBG,
  AssetCardHeaderLogo,
  AssetCardWrapper,
  AssetLogo,
} from './AssetCard.styles'
import SuperMotoSVG from 'assets/nfts/SuperMoto.svg'
import { CardTag, CardTags } from '../EntityCard/EntityCard.styles'
import { ProgressBar } from 'common/components/ProgressBar'

interface Props {
  title?: string
}

const AssetCard: React.FC<Props> = (): JSX.Element => {
  const image = 'https://cellnode-pandora.ixo.earth/public/vmn0fcgf5wrkp3e0i4c'
  const logo = 'https://cellnode-pandora.ixo.earth/public/zonfmqbegbkkp3k8v4j'

  return (
    <AssetCardWrapper>
      <AssetCardHeader background={image}>
        <AssetCardHeaderDotBG />
        <AssetCardHeaderLogo src={SuperMotoSVG} alt="" />
      </AssetCardHeader>

      <AssetCardBody>
        <AssetCardBodyRow
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CardTags>
            <CardTag tagColor={theme.ixoDarkRed}>Inventory</CardTag>
            <CardTag tagColor={theme.ixoNewOrange}>Clean CookStove</CardTag>
          </CardTags>
          <AssetLogo src={logo} alt="" />
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column' }}>
          <Typography
            color="#01283B"
            fontWeight={700}
            fontSize="23px"
            lineHeight="24px"
            style={{ marginBottom: 4 }}
          >
            SuperMoto Clean Cooking
          </Typography>
          <Typography
            color="#828E94"
            fontWeight={400}
            fontSize="14px"
            lineHeight="16px"
          >
            Malawi Collection 2022
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', gap: 4 }}>
          <ProgressBar
            total={100}
            approved={33}
            rejected={0}
            activeBarColor={
              'linear-gradient(270deg, #6FCF97 50%, #036784 100%)'
            }
          />
          <Typography color="#828E94" fontWeight={400}>
            124.12 CARBON claimed ~1,23K produced
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
          <Typography
            color="#01283B"
            fontWeight={500}
            fontSize="23px"
            lineHeight="27px"
          >
            #101
          </Typography>
          <Typography
            color="#828E94"
            fontWeight={500}
            fontSize="14px"
            lineHeight="16px"
          >
            of 3,000
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ justifyContent: 'space-between' }}>
          <Typography
            color="#828E94"
            fontWeight={400}
            fontSize="14px"
            lineHeight="16px"
          >
            31/09/2022
          </Typography>
          <Typography
            color="#01283B"
            fontWeight={400}
            fontSize="14px"
            lineHeight="16px"
          >
            $ 230.00
          </Typography>
        </AssetCardBodyRow>
      </AssetCardBody>
    </AssetCardWrapper>
  )
}

export default AssetCard
