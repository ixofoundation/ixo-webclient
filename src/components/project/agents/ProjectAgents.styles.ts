import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Tab = styled(NavLink)`
  background: #143F54;
  border-radius: 0.25rem;
  padding: 0.3rem 1rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    text-decoration: none;
    color: #87DEF6;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.375rem;
`

export const ActionButton = styled.button`
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #39C3E6;
  font-weight: 700;
  border: 1px solid #39C3E6;
  background: transparent;
  width: 120px;
  height: 36px;
`

export const Divider = styled.hr`
  border-color: #143F54;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
`