import React, { useState, useEffect, PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { UsageRecord } from '../models/UsageRecord';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { unixToDatetime } from '../utils/timeConvert';
import {useParams} from 'react-router-dom';

let defaultData = [
  ['Operation', ''],
  ['', 0],
];

const UserChart: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([
    ['Test Name', 'Time'],
    ['', 0],
  ]);

  const getData = async () => {
    const {id} = useParams<{id: string}>();
    const results: UsageRecord[] = (await userApi.getUsageRecords(id as string)) as UsageRecord[];

    console.log('chart api response:');
    console.log(results);

    if (results.length === 0) {
      return;
    }

    let newData = [...data];

    let i: number;
    if (results.length > 10) {
      i = results.length - 10;
    } else {
      i = 0;
    }
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('chart data changes:');
    console.log(data);
  }, [data]);

  const options = {
    title: 'Medical Record',
    curveType: 'function',
    legend: { position: 'bottom' },
  };
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default UserChart;
