/* IMPORTS */
import React, { useEffect, useState } from 'react';

import { useTestContext } from '../../context/test/TestContext';

import Section from '../../models/test/Section.interface';

import shuffle from '../../utils/shuffleArray';

import { Input, Select } from 'antd';
const { Option } = Select;

/* LOCAL INTERFACES */
interface MatchingHeadingSectionProps {
  sectionIndex: number;
  section: Section;
}

/* COMPONENT */
export default function MatchingHeadingSection(
  props: MatchingHeadingSectionProps
) {
  const [answers, setAnswers] = useState<string[]>([]);

  // context
  const { reviewMode, submitData, setSubmitData } = useTestContext();

  useEffect(() => {
    // create answers array made from list of correct answers
    let newAnswers = props.section.content.map((item) => {
      return item.correctAns as string;
    });

    // shuffle answers array
    shuffle(newAnswers);

    setAnswers(newAnswers);
  }, []);

  // empty function if in review mode
  const handleChange = reviewMode
    ? () => {}
    : (value: string, index: number) => {
        let newChosenAnswers = [
          ...submitData.sections[props.sectionIndex - 1].answers,
        ];
        newChosenAnswers[index] = value;

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

      {/* media (image) */}
      <div>
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

        {/* questions and draggable answer list */}
        <div>
          {props.section.content &&
            props.section.content.map((question, index) => {
              if (question.q) {
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-4 flex items-center my-1 p-2 ${
                      reviewMode
                        ? submitData.sections[props.sectionIndex - 1].answers[
                            index
                          ] === question.correctAns
                          ? 'bg-green-300'
                          : 'bg-red-300'
                        : ''
                    }`}
                  >
                    <p className="col-span-3">
                      <span className="font-bold">
                        Question {props.section.startIndex + index}:
                      </span>{' '}
                      {question.q}
                    </p>
                    <Select
                      onChange={(value) => {
                        handleChange(value, index);
                      }}
                      disabled={reviewMode}
                      value={
                        submitData.sections[props.sectionIndex - 1].answers[
                          index
                        ]
                      }
                      className={`w-full py-1`}
                    >
                      {answers &&
                        answers.map((answer, answerIndex) => (
                          <Option value={answer} key={answerIndex}>
                            <span className="font-bold pr-2">
                              {String.fromCharCode(answerIndex + 65)}
                            </span>{' '}
                            {answer}
                          </Option>
                        ))}
                    </Select>
                  </div>
                );
              }
            })}
        </div>

        <div className="p-3 rounded-md border flex items-center place-content-center">
          <div className="">
            <h3 className="font-bold">
              {props.section.smallAnswerDescription}
            </h3>
            {answers &&
              answers.map((answer, index) => (
                <p key={index}>
                  <span className="font-bold pr-2">
                    {String.fromCharCode(index + 65)}
                  </span>{' '}
                  {answer}
                </p>
              ))}
          </div>
        </div>
      </div>

      {reviewMode && (
        <div className="py-5">
          <h3 className="font-bold">Explanation</h3>
          <div className="p-3 rounded-md border bg-gray-200">
            <div className="">
              {props.section.content.map((question, index) => (
                <div key={index}>
                  <p>
                    <span className="font-bold">
                      Câu {props.section.startIndex + index}:
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
