import Navbar from '../components/navbar'
import { useParams } from 'react-router-dom'
import useFetch from '../api/UseFetch'
import './Case.css'

const Case = () => {

    const {medID} = useParams();
    const {data: case_, error, isPending} = useFetch('http://localhost:8080/medinfo/patient_query_medicalinfo/' + medID);


    return(
        <div className="box">
            {isPending && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {case_ && 
                <div className='container'> 
                    <div className='container-title'>
                        <h2>CASE ID: {case_.response.ID}</h2>
                    </div>

                    <div className='container-context'>
                        {case_.response.Cases.map(Case => (
                            <div className='container-context'>
                               <div className='container-title'>
                                <p className ='container-text' key={Case.Case_ID}>Case ID: {Case.Case_ID}</p>
                               </div>
                                {Case.Examinations.map(exam => {
                                    return(
                                        <div className='container-sub-context'>
                                            <div className='container-text-box' >
                                                <p className ='container-text' key={Case.Case_ID}>Diagnosis: {exam.Diagnosis}</p>
                                            </div >
                                            <div className='container-text-box'>
                                                <p className ='container-text' key={Case.Case_ID}>Test result: {exam.TestResult}</p>
                                            </div >
                                            <div className='container-text-box'>
                                                <p className ='container-text' key={Case.Case_ID}>Treatment: {exam.Treatment}</p>
                                            </div > 
                                    </div>
                                    )
                                })}
                            
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Case;