import { Row, Col } from 'antd';
import { MiddleBlockSection, Content, ContentWrapper } from './styles';

interface MiddleBlockProps {
  title: string;
  content: string;
}

const MiddleBlock = ({ title, content }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <MiddleBlockSection>
      <Row justify="center" align="middle">
        <ContentWrapper>
          <Col lg={24} md={24} sm={24} xs={24}>
            <h6>{title}</h6>
            <Content>{content}</Content>
          </Col>
        </ContentWrapper>
      </Row>
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
