import styled from 'styled-components';

export const StyledButton = styled('button')<any>`
  background: ${(p) => p.color || '#72c6d5'};
  color: ${(p) => (p.color ? '#72c6d5' : '#fff')};
  font-size: 20px;
  font-weight: 900;
  width: 100%;
  height: 50px;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #72c6d5;
    border: 1px solid #72c6d5;
    background-color: #fff;
  }
`;
