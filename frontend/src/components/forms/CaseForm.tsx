import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input, Button, FormInstance} from 'antd'
import { Case } from '../../models/MedicalInfo';
import { medinfoApi } from '../../api/medinfoApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Card} from 'antd'
import { useParams } from 'react-router-dom';

const {TextArea} = Input;

const CaseForm = () => {

    type doctorParams = {
        doctor_username: string
    }

    const {doctor_username} = useParams<doctorParams>();

    const [testresult, setTestresult] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [medical_id, setMedicationId] = useState('');
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
        medinfoApi.addCase(examination, doctor_username, username, medical_id);
        navigate('/user/operator/profile/' + doctor_username);

    };


    return ( 
        

        <Card className={styles.cover}>

        <Divider orientation="left"style={{fontSize: 40}}>Create Case</Divider> 

        <Form 
            className={styles.case_form}
            onFinish={onFinish}

        >
            <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="username" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                />
            </Form.Item>

            <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="medical infor" 
                    id="medical_infor" 
                    value={medical_id}
                    onChange={(e) => setMedicationId(e.target.value)}

                />
            </Form.Item>
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

            <Form.Item >
                <Button 
                    type="primary"
                    htmlType="submit"
                >
                    Add New Case
                </Button>
            </Form.Item >
        </Form>
        </Card>
    )
}

export default CaseForm;