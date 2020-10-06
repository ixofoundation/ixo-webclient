import * as React from 'react'
import { 
  Container
} from './ButtonSlider.styles';

class ButtonSlider extends React.Component
{
  render() {
    const { children } = this.props;
    return (
      <Container>
        { children }
      </Container>
    )
  }
}

export default ButtonSlider;