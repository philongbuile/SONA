import Navbar from '../components/navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'
import './Case.css'


const Case = () => {

    const {id} = useParams();
    const {data, error, isPending} = useFetch('http://localhost:8080/record/query/' + id);
    return(
        <div className="Case">
            <div>

            </div>
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {data && (
                <div className='container"'> 
                    <div className='container-title'>
                        <h2>Title</h2>
                    </div>
                    <div className='container-context'>
                    <div>Operation Name:
                        <div>
                            <p className ='data-text'>{data.OperatorName}</p>
                        </div>
                    </div>
                    <div>Operation:
                        <p className ='data-text'>{data.Operation}</p>
                    </div>
                    <div>Role:
                        <p className ='data-text'>{data.Roles}</p>
                    </div>
                    <div>Record ID:
                        <p className ='data-text'>{data.Record_ID}</p>
                    </div>
                    <div>Time:
                        <p className ='data-text'>{data.Times}</p>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Case;