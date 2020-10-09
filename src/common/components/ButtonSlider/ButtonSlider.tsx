import * as React from 'react'
import { 
  Container,
  NavigateButtonContainer
} from './ButtonSlider.styles';
import Down from 'assets/icons/Down'

class ButtonSlider extends React.Component
{
  render() {
    const { children } = this.props;
    return (
      <Container>
        { children }
        <NavigateButtonContainer>
          <button className="left">
            <Down fill='#107591' width={ 8 } />
          </button>
          <button className="right">
            <Down fill='#107591' width={ 8 } />
          </button>
        </NavigateButtonContainer>
      </Container>
    )
  }
}

export default ButtonSlider;