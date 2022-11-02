import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/useFetch'
import './Case.css'
import { PersonalInforFetch } from '../api/userApi';

const Case = () => {

    const {medID} = useParams();
    console.log(medID)
    const {data, error, isPending} = useFetch(`http://localhost:8080/medinfo/query_by_keyword/["${medID}"]`);
    // const { data: personalData, isPendingP, errorP } = PersonalInforFetch('philong123');

    console.log(data);
    return(
        <div className="box">
            <Navbar/>
            {isPending && <div className='loader'> </div>}
            {error && <div> {error} </div>}
            {data && 
                <div className='container'> 
                    <div className='container-title'>
                        <h1>MEDICAL ID: {data.response[0].ID}</h1>
                    </div>
                    {data.response[0].Cases[0].Examinations.map((Exam) => {
                        return(
                            <div className='container-context'>
                                <div className='container-text-box'>
                                    <p className='container-text'>Diagnosis: {Exam.Diagnosis}</p>
                                </div>

                                <div className='container-text-box'>
                                    <p className ='container-text'> Test Result: {Exam.TestResult}</p>
                                </div>

                                <div className='container-text-box'>
                                    <p className ='container-text'>Treatment: {Exam.Treatment}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Case;