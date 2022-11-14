import { useParams } from 'react-router';
import useFetch from '../api/useFetch'

const QueryPatientContext = () => {

    const {patient} = useParams();
    const {data, error, isPending} = useFetch('http://localhost:8080/patient/doctorQuery/' + patient + '/Doctor1');

    return(
        <div className='container-query-context'>
            {isPending && <div className='loader'> </div>}
            {error && <div> {error} </div>}
            {data && (
                <div> 
                    <h1>{data.response.FullName}</h1>
                    <h1>{data.response.DoB}</h1>
                    <h1>{data.response.Address}</h1>
                </div>
            )}

        </div>
    )
}

export default QueryPatientContext;