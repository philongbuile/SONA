import { StyledContainer } from './styles';
import { ContainerProps } from '../../models/Landing';

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
