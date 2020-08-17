import * as React from 'react';
import { HeroContainer } from './Hero.styles';

interface Props {
  title: string
}

export const Hero: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <HeroContainer>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};
