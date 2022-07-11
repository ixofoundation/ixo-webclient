import styled from 'styled-components'

export const BondsHomeSectionNav = styled.div`
  padding: 1rem;
  margin-left: 1.875rem;
  a {
    font-weight: normal;
    font-size: 1.1875rem;
    text-transform: uppercase;
    text-decoration: none;

    color: #ffffff;
    padding: 0.25rem 1.5rem;
    &.active {
      color: #87def6;
    }
    &:hover {
      text-decoration: none;
      color: #87def6;
    }
  }
  @media (max-width: 768px) {
    padding: 1rem 0;
    margin: 0;
    width: initial;
    overflow-x: scroll;
  }
`

export const Container = styled.div`
  // padding: 20px 40px;
  // background: #E5E5E5;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-weight: normal;
  padding-bottom: 100px;
`

export const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0px;
`

export const SectionTitle = styled.div`
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  color: #ffffff;
`

export const StyledButton = styled.button`
  background: unset;
  padding: 10px 20px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props): string => props.theme.highlight.light};
  border-radius: 4px;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  padding: 5px 30px;
`

export const AlphaSpan = styled.span`
  background: #033c50;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: ${(props): string => props.theme.highlight.light};
  padding: 5px 10px;
`
