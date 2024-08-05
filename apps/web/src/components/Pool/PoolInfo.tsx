import styled from 'styled-components'

// import ImpactHubIcon from '/public/assets/img/relayer.png'

const PoolInfoWrapper = styled.div<{ border?: boolean }>`
  position: relative;
  background: #03324a;
  border: 1px solid ${(props: any): string => (props.border ? props.theme.ixoNewBlue : 'transparent')};
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
  text-transform: uppercase;
`

const LabelWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #537b8e;

  span {
    color: white;
  }
`

interface Props {
  placeholder?: string
  label?: string
  logo?: string
  border?: boolean
}

const PoolInfo: React.FunctionComponent<Props> = ({ placeholder, label, logo, border }) => {
  return (
    <PoolInfoWrapper border={border}>
      <IconWrapper>
        <img src={logo} alt='ImpactHubIcon' />
      </IconWrapper>

      <ValueWrapper>{placeholder}</ValueWrapper>

      <LabelWrapper dangerouslySetInnerHTML={{ __html: label! }} />
    </PoolInfoWrapper>
  )
}

export default PoolInfo
