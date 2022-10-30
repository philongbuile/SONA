import React, { useEffect } from 'react';
import { Form, Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { useTestContext } from '../../context/test/TestContext';

import Section from '../../models/test/Section.interface';

// local interfaces
interface MultipleChoiceSectionProps {
  sectionIndex: number;
  section: Section;
}

export default function MultipleChoiceSection(
  props: MultipleChoiceSectionProps
) {
  // context
  const { reviewMode, submitData, setSubmitData } = useTestContext();

  const handleChange = reviewMode
    ? () => {}
    : (event?: RadioChangeEvent) => {
        let newChosenAnswers = [
          ...submitData.sections[props.sectionIndex - 1].answers,
        ];
        newChosenAnswers[parseInt(event?.target.name as string)] =
          event?.target.value;

        let newSubmitDataSections = [...submitData.sections];
        newSubmitDataSections[props.sectionIndex - 1].answers =
          newChosenAnswers;
        let newSubmitData = {
          ...submitData,
          sections: newSubmitDataSections,
        };
        setSubmitData(newSubmitData);
      };

  return (
    <div>
      <div
        className="whitespace-pre-line font-bold py-5"
        dangerouslySetInnerHTML={{ __html: props.section.title }}
      />

      <div>
        {props.section.media &&
          props.section.media.map((image, imageIndex) => (
            <div key={imageIndex} className="flex flex-col items-center">
              <div className="flex justify-center">
                <img className="py-10 w-11/12" src={image.content} />
              </div>
              <p className="mb-10 italic">{image.title}</p>
            </div>
          ))}
      </div>

      {props.section.content &&
        props.section.content.map((question, questionIndex) => (
          <div
            className={`${
              reviewMode &&
              (submitData.sections[props.sectionIndex - 1].answers[
                questionIndex
              ] === question.correctAns
                ? 'bg-green-300'
                : 'bg-red-300')
            } p-3 my-3`}
          >
            <Form.Item
              key={props.section.startIndex + questionIndex}
              label={
                <h3 className="font-bold">
                  Question {props.section.startIndex + questionIndex}:{' '}
                  {question.q}
                </h3>
              }
            >
              <Radio.Group
                style={{ paddingLeft: 15 }}
                name={`${questionIndex}`}
                onChange={handleChange}
                disabled={reviewMode}
                value={
                  submitData.sections[props.sectionIndex - 1].answers[
                    questionIndex
                  ]
                }
              >
                <Space direction="vertical">
                  {question.a &&
                    question.a.map((choice, choiceIndex) => (
                      <Radio key={choiceIndex} value={choice}>
                        {choice}
                      </Radio>
                    ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>
        ))}

      {reviewMode && (
        <div className="py-5">
          <h3 className="font-bold">Explanation</h3>
          <div className="p-3 rounded-md border bg-gray-200">
            <div className="">
              {props.section.content.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <p>
                    <span className="font-bold">
                      Câu {props.section.startIndex + questionIndex}:
                    </span>{' '}
                    {question.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
