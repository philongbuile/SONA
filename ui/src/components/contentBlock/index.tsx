import LeftContentBlock from '../../components/contentBlock/leftContent';
import RightContentBlock from '../../components/contentBlock/rightContent';
import { ContentBlockProps } from '../../components/contentBlock/styles';

const ContentBlock = (props: ContentBlockProps) => {
  if (props.type === 'left') return <LeftContentBlock {...props} />;
  if (props.type === 'right') return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
