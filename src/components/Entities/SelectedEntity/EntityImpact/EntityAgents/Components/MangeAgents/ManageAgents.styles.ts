import styled from 'styled-components'

export const Heading = styled.h2`
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
  font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
`

export const Section = styled.section`
  padding-bottom: 30px;
  border-bottom: 1px solid #164a63;
  margin-bottom: 30px;

  h3 {
    color: white;
    font-size: 22px;
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};

    i {
      font-size: 25px;
      margin-right: 10px;
    }

    i.icon-pending:before {
      color: #f89d28;
    }
    i.icon-approved:before {
      color: #5ab946;
    }
    i.icon-rejected:before {
      color: #e2223b;
    }
  }
`

export const Indicator = styled.div`
  width: 7px;
  height: 25px;
  position: absolute;
  top: 18px;
  left: -7px;

  background: ${/* eslint-disable-line */ (props) => props.color};
`

export const Mail = styled.a``

export const Col = styled.div`
  font-size: 15px;
  font-weight: 300;

  ${Mail} {
    color: #5094ac;
    text-decoration: none;
    display: block;
  }

  p {
    margin: 0;
  }

  ${Mail}:hover {
    color: white;
    font-weight: 600;
  }

  > div {
    position: relative;
    padding-bottom: 50px;
  }
`

export const Hover = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  > a {
    padding-left: 30px;
    padding-right: 30px;
  }

  :hover {
    opacity: 1;
  }
`

export const Actions = styled.div`
  position: absolute;
  top: 20px;
  width: calc(100% - 40px);

  display: flex;
  justify-content: space-between;
`

export const Selector = styled.div`
  opacity: 0;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoDarkestBlue};
  padding: 2px;
  border-radius: 50%;

  > div {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoNewBlue};
    width: 100%;
    border-radius: 50%;
    height: 100%;
    opacity: 0;

    transition: opacity 0.3s ease;
  }

  > div.selected {
    opacity: 1;
  }
`

export const Buttons = styled.div`
  display: flex;

  a {
    display: block;
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 0 0 10px;
  }
  i:before {
    color: white;
  }

  a:not(.disabled):hover {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }
`

export const DidText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`
