import React from 'react'
import { EClaimFeature } from 'types/protocol'
import { Dropdown, Input, TextArea } from '../Components'
import { Wrapper, Row } from './ClaimAdditionalInfoForm.styles'

interface Props {
  feature: string
  setFeature: (feature: string) => void
  reliability: string
  setReliability: (reliability: string) => void
  userGuide: string
  setUserGuide: (userGuide: string) => void
}

const ClaimAdditionalInfoForm: React.FC<Props> = ({
  feature,
  setFeature,
  reliability,
  setReliability,
  userGuide,
  setUserGuide,
}): JSX.Element => {
  return (
    <Wrapper>
      <Row>
        {/* <Input inputValue={feature} placeholder='Features' handleChange={setFeature} /> */}
        <Dropdown
          placeholder='Features'
          options={Object.entries(EClaimFeature).map(([, value]) => value)}
          value={feature}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFeature(e.target.value)}
        />
      </Row>
      <Row>
        <Input inputValue={reliability} placeholder='Reliability' handleChange={setReliability} />
      </Row>
      <Row>
        <TextArea inputValue={userGuide} placeholder='User Guide' handleChange={setUserGuide} height={'150px'} />
      </Row>
    </Wrapper>
  )
}

export default ClaimAdditionalInfoForm
