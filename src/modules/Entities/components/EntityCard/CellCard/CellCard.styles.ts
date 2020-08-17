import styled from 'styled-components';
import {
  MainContent as MainContentBase,
  Title as TitleBase,
  Founded as FoundedBase,
  FoundedDate as FoundedDateBase,
  StatisticsContainer as StatisticsContainerBase,
  Statistic as StatisticBase,
  StatisticLabel as StatisticLabelBase,
  StatisticValue as StatisticValueBase,
} from '../EntityCard.styles';

export const MainContent = styled(MainContentBase)``;
export const Title = styled(TitleBase)``;
export const Founded = styled(FoundedBase)``;
export const FoundedDate = styled(FoundedDateBase)``;
export const StatisticsContainer = styled(StatisticsContainerBase)``;
export const Statistic = styled(StatisticBase)`
  flex: 0.5;
  font-size: 24px;
  display: flex;
  flex-flow: row nowrap;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;
export const StatisticLabel = styled(StatisticLabelBase)``;

export const StatisticValue = styled(StatisticValueBase)`
  margin-right: 0.5rem;
  font-weight: bold;
`;
