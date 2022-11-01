import LeftContentBlock from './leftContent';
import RightContentBlock from './rightContent';
import { ContentBlockProps } from './styles';

const ContentBlock = (props: ContentBlockProps) => {
  if (props.type === 'left') return <LeftContentBlock {...props} />;
  if (props.type === 'right') return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
