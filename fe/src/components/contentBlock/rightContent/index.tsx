import { Row, Col } from 'antd';
import { SvgIcon } from '../../Landing/SvgIcon';
import { ContentBlockProps } from '../../../models/ContentBlockData';
import { RightBlockContainer, Content, ContentWrapper } from './styles';

const RightBlock = ({ title, content, icon, id }: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <RightBlockContainer>
      <Row justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={11} xs={24}>
          <ContentWrapper>
            <h6>{title}</h6>
            <Content>{content}</Content>
          </ContentWrapper>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <SvgIcon src={icon} width="100%" height="100%" />
        </Col>
      </Row>
    </RightBlockContainer>
  );
};

export default RightBlock;
