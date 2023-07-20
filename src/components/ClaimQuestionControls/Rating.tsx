import React from 'react'
import { TClaimQuestionControlProps } from './types'
import styled, { useTheme } from 'styled-components'
import ReactRating from 'react-rating'
import { FlexBox } from 'components/App/App.styles'

const StyledRating = styled.div``

const Rating: React.FC<TClaimQuestionControlProps> = ({ value, onChange, ...rest }) => {
  const theme: any = useTheme()
  const scale = rest.scale || 5

  return (
    <StyledRating>
      <ReactRating
        stop={scale}
        emptySymbol={new Array(scale).fill(0).map((v, n) => (
          <FlexBox
            key={n}
            alignItems='center'
            justifyContent='center'
            borderRadius='100%'
            width='24px'
            height='24px'
            background={theme.ixoDarkBlue}
            mr={2}
          >
            {n + 1}
          </FlexBox>
        ))}
        fullSymbol={new Array(scale).fill(0).map((v, n) => (
          <FlexBox
            key={n}
            alignItems='center'
            justifyContent='center'
            borderRadius='100%'
            width='24px'
            height='24px'
            background={theme.ixoNewBlue}
            mr={2}
          >
            {n + 1}
          </FlexBox>
        ))}
        initialRating={(value as number) || 0}
        onChange={(value) => onChange(value)}
      />
    </StyledRating>
  )
}

export default Rating
