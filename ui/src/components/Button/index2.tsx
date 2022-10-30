import { StyledButton } from './styles';
import { ButtonProps } from '../../models/landingcomponent';

export const Button = ({
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledButton color={color} fixedWidth={fixedWidth} onClick={onClick}>
    {children}
  </StyledButton>
);
