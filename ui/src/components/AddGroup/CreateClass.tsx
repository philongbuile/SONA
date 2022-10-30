import React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';

const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const CreateForm: React.FC = () => {
  //useState for UserID
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  //Check selected IDs
  const filteredOptions = OPTIONS.filter(
    (o) => !selectedIDs.includes(o.toString())
  );

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div style={{ width: '60%' }}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Select
          mode="multiple"
          placeholder="Student Name"
          value={selectedIDs}
          onChange={setSelectedIDs}
          style={{ width: '100%' }}
        >
          {filteredOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form>
    </div>
  );
};

export default CreateForm;
