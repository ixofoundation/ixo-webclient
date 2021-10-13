import React from 'react'
import styled from 'styled-components'

import ImpactHubIcon from 'assets/img/relayer.png'

const AllValidatorWrapper = styled.div`
  position: relative;
  background: #03324a;
  border: 1px solid #49bfe0;
  border-radius: 4px;
  padding: 13px;
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  background: #053f5c;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;

  & > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`
const ValueWrapper = styled.div`
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
`

const LabelWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  font-family: Roboto;
  font-style: italic;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #537b8e;
`

interface Props {
  label?: string
}

const AllValidator: React.FunctionComponent<Props> = ({ label }) => {
  return (
    <AllValidatorWrapper>
      <IconWrapper>
        <img src={ImpactHubIcon} alt="ImpactHubIcon" />
      </IconWrapper>

      <ValueWrapper>All Validators</ValueWrapper>

      <LabelWrapper>{label}</LabelWrapper>
    </AllValidatorWrapper>
  )
}

export default AllValidator
