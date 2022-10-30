/* IMPORTS */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
// components
import { Form } from 'antd';
import MultipleChoiceSection from './MultipleChoiceSection';
import MatchingHeadingSection from './MatchingHeadingSection';
import TrueFalseSection from './TrueFalseSection';
import FillBlankSection from './FillBlankSection';
import AudioPlayer from './AudioPlayer';
// interfaces
import Section from '../../models/test/Section.interface';

//local interfaces
interface ListeningTestProps {
  audioSource: string;
  sections: Section[];
}

export default function ListeningTest(props: ListeningTestProps) {
  // params
  const { id } = useParams();
  // form
  const [form] = Form.useForm();
  // states
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

  return (
    <>
      <div style={{ padding: 30, backgroundColor: '#E5E5E5' }}>
        <div className="flex content-center place-content-center">
          <div className="p-5 md:p-10 rounded-lg w-full lg:w-1/2 md:px-50 bg-white overflow-hidden shadow-lg">
            <Form form={form} layout="vertical" autoComplete="off">
              {sectionComponent}
            </Form>
          </div>
        </div>
      </div>

      <AudioPlayer audioSource={props.audioSource} />
    </>
  );
}
