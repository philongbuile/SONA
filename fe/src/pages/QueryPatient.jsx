import React from 'react';
import './QueryPatient.css'
import {useState, useRef} from 'react'
import {Link} from 'react-router-dom';
import QueryPatientContext from './QueryPatientContext';


const QueryPatient = () => {
    const [patient, setPatient] = useState('');
    const inputRef = useRef(null);

    function handleClick() {
      setPatient(inputRef.current.value)
      console.log(inputRef.current.value);
    }


    return(
        <div>
            <div className='box-query'>
                <div className='container-query'>
                    <div className='box-head'>
                        <div className='box-content'>
                            <h1>QUERY PATIENT:</h1> 
                        </div>
                        <div className='box-content'>
                            <input ref={inputRef} placeholder="Basic usage" />
                            <Link to={`/operator/query_patient/${patient}`}>
                                <button onClick={handleClick}> INPUT</button>
                            </Link>
                    </div>
                    </div>
{/* 
                    <div className='box-body'>
                        <QueryPatientContext data={patient} />
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default QueryPatient;