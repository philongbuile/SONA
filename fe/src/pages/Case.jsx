import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/useFetch'
import './Case.css'
import { PersonalInforFetch } from '../api/userApi';

const Case = () => {

    const {id} = useParams();
    const {data, error, isPending} = useFetch('http://localhost:8080/record/query/' + id);
    const { data: personalData, isPendingP, errorP } = PersonalInforFetch('philong123');

    console.log(data);
    console.log(personalData);
    return(
        <div className="box">
            <Navbar/>
            {isPending && <div className='loader'> </div>}
            {error && <div> {error} </div>}
            {case_ && 
                <div className='container'> 
                    <div className='container-title'>
                        <h2>CASE ID: {case_.response.ID}</h2>
                    </div>

    // const {data, error, isPending} = useFetch('http://localhost:8080/record/query/' + id);
    const { data, error, isPending } = PersonalInforFetch('philong123');

    console.log(data);
    // console.log(personalData);
    return(
        <div className="box">
            {isPending && <div className='loader'> </div>}
            {error && <div> {error} </div>}
            {data && (
                <div className='container'> 
                    <div className='container-title'>
                        <h2>Title</h2>
                    </div>
                </div>
            }
        </div>
    )
}

export default Case;