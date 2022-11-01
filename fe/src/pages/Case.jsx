import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'
import './Case.css'


const Case = () => {

    const {username} = useParams();
    const {data: Case, error, isPending} = useFetch('http://localhost:8080/patient/query/' + username);
    return(
        <div className="box">
            <div>

            </div>
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {Case && (
                <div className='container'> 
                    <div className='container-title'>
                        <h2>Title</h2>
                    </div>
                    <div className='container-context'>
                    <div className='container-text-box'>Operation Name:
                        <div>
                            <p className ='container-text'>{Case.OperatorName}</p>
                        </div>
                    </div >
                    <div className='container-text-box'>Operation:
                        <p className ='container-text'>{Case.Operation}</p>
                    </div>
                    <div className='container-text-box'> Role:
                        <p className ='container-text'>{Case.Roles}</p>
                    </div>
                    <div className='container-text-box'>Record ID:
                        <p className ='container-text'>{Case.Record_ID}</p>
                    </div>
                    <div className='container-text-box'>Time:
                        <p className ='data-text'>{Case.Times}</p>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Case;