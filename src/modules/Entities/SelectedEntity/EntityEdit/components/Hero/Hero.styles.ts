import styled from "styled-components";
import { deviceWidth } from "../../../../../../lib/commonData";

export const HeroContainer = styled.div`
  background: #002233;
  color: #fff;
  font-family: ${(props: any): string => props.theme.fontRoboto};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  @media (min-width: ${deviceWidth.tablet}px) {
    min-height: 200px;
  }

  h1 {
    font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
    font-size: 45px;
    line-height: 1;
    color: black;
    margin: 0;
    letter-spacing: 0.3px;
  }
`;
