import Navbar from '../components/navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'


const Case = () => {

    const {id} = useParams();
    const {data: card, error, isPending} = useFetch('http://localhost:8080/record/query/' + id);
    return(
        <div className="controller-grid">
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {card && (
                <article className=''>
                    <div>
                        <h2>{card.title}</h2>
                    </div>
                    <div >
                        <div>Test Result: 
                            <p >{card.testResult}</p>
                        </div>
                        
                        <div>Diagnosis: 
                            <p >{card.diagnosis}</p>
                        </div>
                        <div>Treatmen:
                            <p >{card.treatment}</p>
                        </div>
                    </div>
                </article>
            )}
        </div>
    

    )
}

export default Case;