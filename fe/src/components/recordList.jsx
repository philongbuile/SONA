import './RecordList.css';
import { Form, Card, Table } from 'antd';

const Record = () => {

    const columns = [
        {
            id: 'id',
            name: 'name',
            diagnosis: 'diagnosis',
            treatment: 'treatment'
        },
        {
            id: 'id',
            name: 'name',
            diagnosis: 'diagnosis',
            treatment: 'treatment'
        },
        {
            id: 'id',
            name: 'name',
            diagnosis: 'diagnosis',
            treatment: 'treatment'
        }
    ];

    const data = [
        {
            id: '1',
            name: 'John Brown',
            diagnosis: 'fever',
            treatment: 'paracetamol'
        },
        {
            id: '2',
            name: 'Jim Green',
            diagnosis: 'diabetes',
            treatment: 'insulin'
        },
        {
            id: '3',
            name: 'Joe Black',
            diagnosis: 'cancer',
            treatment: 'chemotherapy'
        },
    ];

    return (
        <Card className="record_list">
            <Form className="">
                <Table columns={columns} dataSource={data} />
            </Form>
        </Card>
    );
};

export default Record;