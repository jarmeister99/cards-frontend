import styled, { css } from "styled-components";

const PaleVioletButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  font-size: 1em;
  :hover {
    cursor: pointer;
  }
  ${(props: { primary: boolean; }) => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

export { PaleVioletButton }