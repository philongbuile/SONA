import Navbar from '../components/navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'


const Case = () => {

    const {id} = useParams();
    const {data: cardData, error, isPending} = useFetch('http://192.168.3.103:3000/case/' + id);
    return(
        <div className='case-details'>
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {cardData && (
                <article>
                    <h2>{cardData.title}</h2>
                    <div >
                        <p >{cardData.testResult}</p>
                        <p >{cardData.diagnosis}</p>
                        <p >{cardData.treatment}</p>
                    </div>
                </article>
            )}
        </div>
    )
}

export default Case;