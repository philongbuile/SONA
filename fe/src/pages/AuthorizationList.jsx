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
        {
            key: '3',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },  
        {
            key: '4',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '5',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '6',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '7',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }
    ]

    return (
        <div className="AuthorizationList">
            <Navbar />
            <div className='body'>
                <div className='container'>
                    <AuthorizationTable column={columns} row={data} />
                </div>
            </div>
        </div>
        
    );
}

export default AuthorizationList;