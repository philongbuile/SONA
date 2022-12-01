import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input, Button, FormInstance} from 'antd'
import { Case } from '../../models/MedicalInfo';
import { medinfoApi } from '../../api/medinfoApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Card} from 'antd'
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

const {TextArea} = Input;

const CaseForm = () => {

    type doctorParams = {
        doctor_username: string
    }

    const {doctor_username} = useParams<doctorParams>();

    const [testresult, setTestresult] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    // const [medical_id, setMedicationId] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();


    const onFinish = (e) => {
        console.log('finish');
        
        let examination = {
                    testresult: testresult,
                    diagnosis: diagnosis,
                    treatment: treatment,
                }
        console.log(examination);
        medinfoApi.addCase(examination, doctor_username, username);
        toast('Successful create case! Redirecting to profile...');
        navigate('/user/operator/profile/' + doctor_username);

    };


    return ( 
        <div className={styles.cover}>
            <div>
            <Divider orientation="center"style={{fontSize: 40, fontWeight: "Bold", color: "#72c6d5"}}>Create Case</Divider> 
            </div>

        <div className={styles.case_form}>

        <Form>
            <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="username" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                />
            </Form.Item>

            {/* <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="medical infor" 
                    id="medical_infor" 
                    value={medical_id}
                    onChange={(e) => setMedicationId(e.target.value)}

                />
            </Form.Item> */}
            <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="test result" 
                    id="test-result" 
                    value={testresult} 
                    onChange={(e) => setTestresult(e.target.value)}

                />
            </Form.Item>

            <Form.Item>
                <TextArea
                    rows={5}
                    placeholder="diagnosis" 
                    id='diagnosis' 
                    value={diagnosis} 
                    onChange={(e) => setDiagnosis(e.target.value)}

                />
            </Form.Item>

            <Form.Item>
                <TextArea 

                    rows={5}
                    placeholder="treatment" 
                    id="treatment" 
                    value={treatment} 
                    onChange={(e) => setTreatment(e.target.value)}

                    />
            </Form.Item>
        </Form>
        <div>
            <Button 
            onClick={() => {
                navigate('/user/operator/profile/' + doctor_username);
            }}
            style={{
                backgroundColor: "#72c6d5",
                color: "white",
                fontWeight: "Bold",
                border: "2px solid white"
            }}>
                Back
            </Button>
            <Button 
                type="primary"
                onClick={onFinish}
                style={{
                    backgroundColor: '#72c6d5',
                    fontWeight: "Bold",
                    border: "2px solid white"
                }}
            >
                Add New Case
            </Button>
        </div>
        </div>
        </div>
    )
}

export default CaseForm;