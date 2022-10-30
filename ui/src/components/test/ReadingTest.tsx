/* IMPORTS */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
// components
import { Form } from 'antd';
import MultipleChoiceSection from './MultipleChoiceSection';
import MatchingHeadingSection from './MatchingHeadingSection';
import TrueFalseSection from './TrueFalseSection';
import FillBlankSection from './FillBlankSection';
import AnswerDrawer from './AnswerDrawer';
//interfaces
import Section from '../../models/test/Section.interface';
// context
import { useTestContext } from '../../context/test/TestContext';

//local interfaces
interface ReadingTestProps {
  title: string;
  passage: string;
  illustration: string;
  sections: Section[];
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ReadingTest(props: ReadingTestProps) {
  // context
  const { setIsLoading } = useTestContext();
  //params
  const { id } = useParams();
  //form
  const [form] = Form.useForm();
  //states
  const [visible, setVisible] = useState(false);
  const [sectionComponent, setSectionComponent] = useState<
    JSX.Element | undefined
  >(undefined);

  //function for rendering section depends on its data
  const getSectionComponent = (section: Section, sectionIndex: number) => {
    if (section.type == 'multiple choice question') {
      return (
        <MultipleChoiceSection sectionIndex={sectionIndex} section={section} />
      );
    } else if (section.type == 'matching heading') {
      return (
        <MatchingHeadingSection sectionIndex={sectionIndex} section={section} />
      );
    } else if (section.type == 'fill in the blank') {
      return <FillBlankSection sectionIndex={sectionIndex} section={section} />;
    } else if (section.type == 'tfng') {
      return <TrueFalseSection sectionIndex={sectionIndex} section={section} />;
    }
  };

  useEffect(() => {
    if (
      parseInt(id as string) < 1 ||
      parseInt(id as string) > props.sections.length
    ) {
      setSectionComponent(<h1>Section ID is invalid</h1>);
    } else {
      setSectionComponent(
        getSectionComponent(
          props.sections.at(parseInt(id as string) - 1) as Section,
          parseInt(id as string)
        )
      );
    }
  }, [props.sections, id]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <div style={{ padding: 30, backgroundColor: '#E5E5E5' }}>
        <div className="md:h-screen flex content-center place-content-center">
          <div className="md:grid md:grid-cols-2 md:gap-10 p-7 md:p-10 rounded-lg w-full md:px-50 bg-white overflow-hidden shadow-lg">
            <div className="md:border-r-2 md:pr-8 md:overflow-y-scroll">
              <h1 className="text-center font-bold text-2xl">{props.title}</h1>
              <div className="flex justify-center">
                <img className="py-10 w-11/12" src={props.illustration} />
              </div>
              <p className="whitespace-pre-line">
                {props.passage.replaceAll('\\n', '\n\n')}
              </p>
            </div>

            <div className="hidden md:block pr-8 overflow-y-scroll">
              <Form form={form} layout="vertical" autoComplete="off">
                {sectionComponent}
              </Form>
            </div>

            <div className="block md:hidden">
              <AnswerDrawer
                visible={visible}
                setVisible={setVisible}
                sectionComponent={sectionComponent}
                handleSubmit={props.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      {!visible && (
        <div
          className="md:hidden text-center w-screen sticky bottom-0 bg-primary py-3 text-white"
          onClick={() => {
            setVisible(true);
          }}
        >
          Open Answer Drawer
        </div>
      )}
    </>
  );
}
