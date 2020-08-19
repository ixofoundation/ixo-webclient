import styled from "styled-components";

export const MainContent = styled.div`
  margin: 30px 0 24px;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.2;
  color: ${(props: any): string => props.theme.fontDarkGrey};
`;

export const Progress = styled.div`
  margin-top: 1rem;
  font-size: 36px;
  line-height: 1.2;
  font-weight: normal;
`;

export const ProgressSuccessful = styled.span`
  color: black;
`;

export const ProgressRequired = styled.span`
  color: grey;
`;

export const Founded = styled.p`
  font-size: 12px;
  margin-bottom: 0;
`;

export const FoundedDate = styled.span`
  font-weight: bold;
`;

export const Impact = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

export const Statistic = styled.div``;

export const StatisticLabel = styled.span`
  color: grey;
`;

export const StatisticValue = styled.span`
  color: #000;
`;
