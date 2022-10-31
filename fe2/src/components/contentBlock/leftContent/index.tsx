import { Row, Col } from 'antd';
import { SvgIcon } from '../../Landing/SvgIcon';
import { ContentBlockProps } from '../../../models/ContentBlockData';
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from './styles';

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  id,
}: ContentBlockProps) => {
  return (
    <LeftContentSection>
      <Row justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={12} xs={24}>
          <SvgIcon src={icon} width="100%" height="100%" />
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          <ContentWrapper>
            <h6>{title}</h6>
            <Content>{content}</Content>
            <ServiceWrapper>
              <Row justify="space-between">
                {typeof section === 'object' &&
                  section.map((item: any, id: number) => {
                    return (
                      <Col key={id} span={11}>
                        <SvgIcon src={item.icon} width="60px" height="60px" />
                        <MinTitle>{item.title}</MinTitle>
                        <MinPara>{item.content}</MinPara>
                      </Col>
                    );
                  })}
              </Row>
            </ServiceWrapper>
          </ContentWrapper>
        </Col>
      </Row>
    </LeftContentSection>
  );
};

export default LeftContentBlock;
