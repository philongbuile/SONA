import { StyledContainer } from '../Container/styles';
import { ContainerProps } from '../../models/landingcomponent';

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
