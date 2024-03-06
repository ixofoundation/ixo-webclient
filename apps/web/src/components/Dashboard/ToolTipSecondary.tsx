import styled from 'styled-components'

export default styled.div`
  position: absolute;
  left: 90%;
  background: #001926;
  padding: 6px 10px;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  color: white;
  white-space: nowrap;
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    right: 100%;
    border-right: 8px solid #001926;
    top: 8px;
  }
`
