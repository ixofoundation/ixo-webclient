import styled from 'styled-components'

// import ImpactHubIcon from 'assets/img/relayer.png'

const PoolSelectorWrapper = styled.div<{ border?: boolean }>`
  position: relative;
  background: #03324a;
  border: 1px solid ${(props: any): string => (props.border ? '#49bfe0' : 'transparent')};
  border-radius: 4px;
  padding: 15px;
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
    padding: 4px;
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
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #537b8e;
`

interface Props {
  placeholder?: string
  label?: string
  logo?: string
  border?: boolean
}

const PoolSelector: React.FunctionComponent<Props> = ({ placeholder, label, logo, border }) => {
  return (
    <PoolSelectorWrapper border={border}>
      <IconWrapper>
        <img src={logo} alt='ImpactHubIcon' />
      </IconWrapper>

      <ValueWrapper>{placeholder}</ValueWrapper>

      <LabelWrapper>{label}</LabelWrapper>
    </PoolSelectorWrapper>
  )
}

export default PoolSelector
