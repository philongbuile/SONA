import Section from './Section.interface';

export default interface TestData {
  mediaURL: string;
  title: string;
  content: string;
  description: string;
  type: string;
  sections: Section[];
}
