import { useState } from 'react';
import { Row } from 'antd';
import Container from '../../components/Container';
import { SvgIcon } from '../../components/Landing/SvgIcon';
import { ButtonNor } from '../../components/Button/index';
import { Button } from '../../components/Button/index2';
import { useNavigate } from 'react-router-dom';
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  CustomNavLinkSmall,
  Outline,
  Span,
} from './Styles';

const Header = () => {
  const [visible, setVisibility] = useState(false);

  let navigate = useNavigate();

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: 'smooth',
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo('introduction')}>
          <Span>{'Introduction'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('mission')}>
          <Span>{'Mission'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('about')}>
          <Span>{'About'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: '180px' }}
          onClick={() => navigate('/register')}
        >
          <Span>
            <ButtonNor> {'Sign up'} </ButtonNor>
          </Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: '180px', fontFamily: 'Roboto', color: '#8172d5' }}
          onClick={() => navigate('/login')}
        >
          <Span>
            <Button>{'Sign in'}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          {/* <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer> */}
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
      </Container>
    </HeaderSection>
  );
};

export default Header;
