import { theme, Typography } from 'modules/App/App.styles'
import React from 'react'
import {
  OptionBox,
  OptionBoxWrapper,
  PageWrapper,
  Selections,
} from './SelectCreationProcess.styles'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as AssetIcon } from 'assets/images/icon-asset.svg'
import { ReactComponent as StarIcon } from 'assets/images/icon-star.svg'

const SelectCreationProcess: React.FC = (): JSX.Element => {
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
        An Asset Class Template is used to create tokenised Asset Collections
        that share the same characteristics.
        <br />
        <br />
        You may choose to start by cloning or forking an existing Asset Class
        Template.
      </Typography>

      <Selections>
        <OptionBoxWrapper to="/create/entity/asset/select-token-standard">
          <OptionBox>
            <EntityIcon />
          </OptionBox>
          <Typography
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="28px"
            lineHeight="32px"
            style={{ letterSpacing: 0.3 }}
          >
            Use a<br />
            Token Template
          </Typography>
        </OptionBoxWrapper>

        <OptionBoxWrapper to="/create/entity/asset/select-token-standard">
          <OptionBox>
            <AssetIcon />
          </OptionBox>
          <Typography
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="28px"
            lineHeight="32px"
            style={{ letterSpacing: 0.3 }}
          >
            Clone an existing
            <br />
            Asset Class
          </Typography>
        </OptionBoxWrapper>

        <OptionBoxWrapper to="/create/entity/asset/select-token-standard">
          <OptionBox>
            <StarIcon />
          </OptionBox>
          <Typography
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="28px"
            lineHeight="32px"
            style={{ letterSpacing: 0.3 }}
          >
            Create a new
            <br />
            Asset Class
          </Typography>
        </OptionBoxWrapper>
      </Selections>
    </PageWrapper>
  )
}

export default SelectCreationProcess
