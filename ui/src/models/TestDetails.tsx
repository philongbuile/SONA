import React from 'react';

interface TestDetails {
  id: number;
  testClassId: number;
  tagId: number;
  tagName: string;
  testName: string;
  createdUserId: number;
  previousTestResultId: number;
  targetEntityCode: number;
  title: string;
  info: string;
  status: string;
  duration: number;
  dateAssigned: number;
  dateUpdated: number;
  deadline: number;
  isDone: boolean;
}

export type { TestDetails };
