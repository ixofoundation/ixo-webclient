import styled from 'styled-components'
import { ReactComponent as EnvelopeIcon } from 'assets/images/exchange/envelope.svg'
import { theme } from 'common/components/App/App.styles'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  border-radius: 12px;
  border: 3px solid #0000;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(180deg, #78eac7 0%, #9f9af7 100%) border-box;

  form {
    width: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
export const CirclePayLogoEl = styled.img`
  width: 140px;
  margin-top: 30px;
  margin-bottom: 30px;
`
export const CirclePayBackButtonEl = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
`
export const HeaderTitle = styled.h1<{ color?: string }>`
  color: ${(props): string => props.color || props.theme.neutralDarkGrey};
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  font-size: 16px;
  line-height: 131%;
  margin-bottom: 30px;
`
export const LockIconEl = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`
export const EnvelopeIconEl = styled(EnvelopeIcon)<{ isactive: string }>`
  width: 87px;
  margin: 20px;
  path {
    fill: ${(props): string => (props.isactive === 'true' ? props.theme.ixoGreen : props.theme.neutralLightGrey)};
  }
`
export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > label {
    color: ${(props): string => props.theme.neutralDarkGrey};
    margin-bottom: 8px;
  }
`
export const CirclePayInput = styled.input`
  background: ${(props): string => props.theme.neutralLighterGrey};
  border-radius: 4px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000;
  padding: 10px;
  border: 1px solid transparent;
  width: 100%;

  &::placeholder {
    color: ${(props): string => props.theme.neutralLightGrey};
  }

  &:focus-within {
    border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  }
  &:focus-visible {
    outline: none;
  }
  &:invalid {
    border: 1px solid ${(props): string => props.theme.ixoRed};
  }
`
export const CirclePayRow = styled.div`
  position: relative;
`
export const CreditCardLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  height: 20px;
  transform: translate(0%, -50%);
`
export const CirclePayLink = styled.span`
  color: ${(props): string => props.theme.ixoNewBlue};
  font-weight: 500;
  font-size: 18px;
  line-height: 116%;
  text-align: center;
  cursor: pointer;
`
export const CirclePaySubmitButton = styled.button<{ disabled?: boolean }>`
  margin-top: 30px;
  background: ${(props): string => (props.disabled ? props.theme.neutralLightGrey : props.theme.ixoNewBlue)};
  pointer-events: ${(props): string => (props.disabled ? 'none' : 'auto')};
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  width: 100%;
  height: 40px;
  border: none;
  cursor: pointer;

  &:focus-visible,
  &:focus {
    border: none;
    outline: none;
  }
`
export const CircleUserAgreeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  cursor: pointer;
`
export const CircleUserAgreeRadio = styled.span<{ checked: boolean }>`
  background: ${(props): string => (props.checked ? props.theme.ixoNewBlue : props.theme.neutralLightGrey)};
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
  }
`
export const CircleUserAgreeText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${(props): string => props.theme.neutralDarkGrey};
`
export const NftSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  background: ${(props): string => props.theme.neutralLighterGrey};
  border-radius: 4px;
  padding: 10px;
`
export const NftSummaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const NftSummaryLogo = styled.img`
  width: 40px;
  height: 40px;
`
export const NftSummaryDesc = styled.div`
  display: flex;
  flex-direction: column;
`
export const NftSummaryName = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
`
export const NftSummaryNo = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`
export const NftSummaryPrice = styled(NftSummaryName)``
export const QuoteRefreshWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 400;
  font-size: 12px;
  color: ${(props): string => props.theme.neutralMediumGrey};
`

export const cardSelectorStyles = {
  indicatorsContainer: (provided: any): any => ({
    ...provided,
    alignItems: 'center',
  }),
  dropdownIndicator: (): any => ({
    padding: '0 10px',
    [`svg > path`]: {
      fill: '#000',
    },
  }),
  indicatorSeparator: (): any => ({
    display: 'none',
  }),
  control: (provided: any): any => ({
    ...provided,
    background: theme.neutralLighterGrey,
    border: 'none !important',
    boxShadow: 'none !important',
    cursor: 'pointer',
  }),
  valueContainer: (provided: any): any => ({
    ...provided,
    borderRadius: '4px',
    display: 'flex',
    flexGrow: 1,
    padding: 10,
    gap: 10,
  }),
  input: (provided: any): any => ({
    ...provided,
    color: 'white',
    caretColor: 'transparent',
    margin: 0,
    padding: 0,
  }),
  menu: (provided: any): any => ({
    ...provided,
    width: '100%',
    margin: 0,
    background: theme.neutralLighterGrey,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 200,
  }),
  menuPortal: (provided: any): any => ({
    ...provided,
    zIndex: 200,
  }),
  option: (provided: any): any => ({
    ...provided,
    color: '#000',
    paddingLeft: 10,
    paddingRight: 10,
  }),
  singleValue: (provided: any): any => ({
    ...provided,
    color: '#000',
    margin: 0,
    fontFamily: theme.primaryFontFamily,
    fontWeight: 500,
    fontSize: '18px',
  }),
  placeholder: (provided: any): any => ({
    ...provided,
  }),
}
