export default interface Section {
  startIndex: number;
  endIndex: number;
  title: string;
  media: { title: string; content: string }[];
  type: string;
  smallAnswerDescription: string;
  content: {
    q: string;
    a: string[];
    correctAns: string;
    explanation: string;
  }[];
}
