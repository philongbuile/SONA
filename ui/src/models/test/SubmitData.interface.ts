import SectionAnswer from './SectionAnswer.interface';

export default interface SubmitData {
  id: number; //skillTestId
  testClassId: number;
  sections: SectionAnswer[];
}
