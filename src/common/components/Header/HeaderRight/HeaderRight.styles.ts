import styled from 'styled-components'

export const Inner = styled.div`
  position: relative;
  z-index: 2;
  background: black;

  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
`

export const UserMenu = styled.div`
  position: fixed;
  top: -260px;
  width: 260px;
  right: 0;
  z-index: 1;
  font-family: ${/* eslint-disable-line */ (props) => props.theme.fontRoboto};

  transition: top 0.5s ease;
`

export const UserBox = styled.div`
  width: 160px;
  height: 74px;
  padding: 0 10px 20px 10px;
  border-left: 1px solid #3c3d3d;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.5s ease;

  :hover {
    cursor: pointer;
    background: #002233;
  }

  > p {
    margin-bottom: 0;
    text-align: center;
  }

  i {
    font-size: 14px;
    margin: 1px 0 0 10px;
  }
  svg {
    margin-left: 10px;
  }
`

export const MenuTop = styled.div`
  background-color: #002233;
  padding: 13px 26px;
  font-size: 18px;

  p {
    font-size: 12px;
    margin: 3px 0;
    line-height: 16px;
    font-weight: 300;
  }

  img {
    width: 10px;
    height: 10px;
  }
`

export const RedIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${/* eslint-disable-line */ (props) => props.theme.red};
  margin-right: 8px;
  margin-top: 3px;
`

export const MenuBottom = styled.div`
  background-color: #01151f;
  padding: 15px;
  display: flex;

  p {
    width: 180px;
    font-size: 12px;
  }

  span {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }

  ${RedIcon} {
    margin-top: 5px;
  }
`

export const NoPadLeft = styled.div`
	padding-right:0;
	position:relative;
	z-index:2;

	${UserMenu}.visible {
		top:74px;
	}

	h3 {
		font-size:14px;
		margin-bottom:0;
		display: flex;
		justify-content: space-between;
		z-index:2;
		position:relative;
		letter-spacing:0.3px
		font-weight: 600;
		font-family: ${/* eslint-disable-line */ (props) => props.theme.fontRoboto};
	}
`

export const AccDID = styled.div`
  padding: 3px 6px;
  margin: 6px 0px 5px -6px;
  background: #01151f;
  border-radius: 8px;
  color: #3ea2c0;
  display: flex;
  justify-content: space-between;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
    margin: 0;
    font-weight: 300;
    font-size: 10px;
  }

  span {
    color: #024e67;
    cursor: pointer;
    display: inline-block;
    font-weight: 300;
    font-size: 10px;
  }

  span:hover {
    color: #3ea2c0;
    font-weight: bold;
  }
`

export const LogoutButton = styled.button`
  background: #01151f;
  border-radius: 8px;
  color: #3ea2c0;
  display: block;
  margin: -20px auto 0 auto;
  font-size: 14px;
`

export const StatusBox = styled.div`
  text-align: center;
  width: 110px;
  position: relative;
  z-index: 1;
`
export const StatusText = styled.p`
  color: white;
  text-transform: uppercase;
  font-size: 11px;
  margin: 5px auto 10px;
  font-weight: normal;
`

export const LoginLink = styled.a`
  color: white;
  text-decoration: none;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  z-index: 0;

  :hover {
    text-decoration: none;
    color: white;
  }
`
