import styled from 'styled-components'

// import ImpactHubIcon from '/public/assets/img/relayer.png'

const AllValidatorWrapper = styled.div`
  position: relative;
  background: #03324a;
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  border-radius: 4px;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  font-family: ${(props): string => props.theme.primaryFontFamily};
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

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: italic;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #537b8e;
  pointer-events: none;
`

interface Props {
  placeholder?: string
  label?: string
  logo?: string
}

const AllValidator: React.FunctionComponent<Props> = ({ placeholder, label, logo }) => {
  return (
    <AllValidatorWrapper>
      <IconWrapper>
        <img src={logo} alt='ImpactHubIcon' />
      </IconWrapper>

      <ValueWrapper>{placeholder}</ValueWrapper>

      <LabelWrapper>{label}</LabelWrapper>
    </AllValidatorWrapper>
  )
}

export default AllValidator
