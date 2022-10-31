import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'
import './Case.css'


const Case = () => {

    const {id} = useParams();
    const {data, error, isPending} = useFetch('http://localhost:8080/record/query/' + id);
    return(
        <div className="box">
            <div>

            </div>
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {data && (
                <div className='container'> 
                    <div className='container-title'>
                        <h2>Title</h2>
                    </div>
                    <div className='container-context'>
                    <div className='container-text-box'>Operation Name:
                        <div>
                            <p className ='container-text'>{data.OperatorName}</p>
                        </div>
                    </div >
                    <div className='container-text-box'>Operation:
                        <p className ='container-text'>{data.Operation}</p>
                    </div>
                    <div className='container-text-box'> Role:
                        <p className ='container-text'>{data.Roles}</p>
                    </div>
                    <div className='container-text-box'>Record ID:
                        <p className ='container-text'>{data.Record_ID}</p>
                    </div>
                    <div className='container-text-box'>Time:
                        <p className ='data-text'>{data.Times}</p>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Case;