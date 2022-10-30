import React, { useState, useEffect, PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { Result } from '../models/Result';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { unixToDatetime } from '../utils/timeConvert';

let defaultData = [
  ['Test Name', 'Grade'],
  ['', 0],
];

const UserChart: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([
    ['Test Name', 'Grade'],
    ['', 0],
  ]);

  const getData = async () => {
    const id: number = (await authApi.getId()) as number;
    const results: Result[] = (await userApi.getAllTestResult(id)) as Result[];

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
    for (i; i < results.length; i++) {
      data.push([unixToDatetime(results[i].dateCreated), results[i].score]);
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
    title: 'User Performance',
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
