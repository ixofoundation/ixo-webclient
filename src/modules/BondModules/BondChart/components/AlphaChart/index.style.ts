import styled from 'styled-components'

interface BlockInfoProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22rem;
`

export const GaugeContainer = styled.div`
  flex: 1;
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
  border: 1px solid #0C3549;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  margin-right: 2rem;
  padding: 1.5rem;
`

export const InfoContainer = styled.div`
  flex: 1;
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
  border: 1px solid #0C3549;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Header = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
`

export const Footer = styled.div`
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  /* or 133% */

  /* grey blue / light */

  color: #688EA0;
  mix-blend-mode: normal;font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  /* or 133% */
  text-align: center;

  /* grey blue / light */

  color: #688EA0;
  mix-blend-mode: normal;
`

export const BlockSection = styled.div`
  display: flex;
  justify-content: space-between;
`

export const BlockInfo = styled.div<BlockInfoProps>`
  border: 1.5px solid #00D2FF;
  box-sizing: border-box;
  border-radius: 4px;
  border-color: ${(props): string => props.color};
  color: ${(props): string => props.color};
  height: 10rem;
  width: 10rem;
`

export const BlockInfoStatus = styled.span<BlockInfoProps>`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 36px;
  /* or 200% */

  text-align: center;

  /* ixo blue */

  color: ${(props): string => props.color};
`

export const BlockInfoPercentage = styled.span<BlockInfoProps>`
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 53px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.3px;
  color: ${(props): string => props.color};
`

export const BlockInfoAmount = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
`

export const gaugeStyle = {
  height: '10.5rem'
}