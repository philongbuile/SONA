import React from 'react';

interface Result {
  id: number;
  testClassId: number;
  testId: number;
  testName: string;
  userId: number;
  entityCode: number;
  dateCreated: number;
  score: number;
  comment: string;
  resultNote: string;
}

export type { Result };
