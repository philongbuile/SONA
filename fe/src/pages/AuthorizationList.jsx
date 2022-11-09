import './AuthorizationList.css';
import Navbar from '../components/Navbar';
import AuthorizationTable from '../components/AuthorizationTable';

const AuthorizationList = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
    ]

    return (
        <div className="AuthorizationList">
            <Navbar />
            <AuthorizationTable column={columns} row={data} />
        </div>
        
    );
}

export default AuthorizationList;