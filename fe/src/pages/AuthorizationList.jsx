import './AuthorizationList.css';
import Navbar from '../components/Navbar';
import AuthorizationTable from '../components/AuthorizationTable';
import useFetch from '../api/useFetch';

const AuthorizationList = () => {
    const columns = [
        {field: "Authorized Doctors"}
    ];
    
    const {data, error, isPending} = useFetch('http://localhost:8080/patient/query/philong123')

    return (
        <div className="AuthorizationList">
            <div className='body'>
                <div className='container'>
                    <AuthorizationTable data={data.response} columns={columns}/>
                </div>
            </div>
        </div>
        
    );
}

export default AuthorizationList;