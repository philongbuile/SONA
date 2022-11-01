import './AuthorizationList.css';
import Navbar from '../components/navbar';
import AuthorizationTable from '../components/AuthorizationTable';
import useFetch from '../api/useFetch';

const AuthorizationList = () => {
    const columns = [
<<<<<<< HEAD
        {field: "Authorized Doctors"}
    ];
    
    const {data, error, isPending} = useFetch('http://localhost:8080/patient/query/camtu123')

    return (
        <div className="AuthorizationList">
            <div className='body'>
                <div className='container'>
                    <AuthorizationTable data={data.response} columns={columns}/>
=======
        {field: "key"},
        {field: "name"},
        {field: "age"},
        {field: "address"}
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
                    <AuthorizationTable data={data} columns={columns}/>
>>>>>>> origin
                </div>
            </div>
        </div>
        
    );
}

export default AuthorizationList;