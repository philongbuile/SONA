import styles from '../../assets/css/CaseForm.module.css';
import { Divider, Card, Form, Input , Button} from 'antd'
import { useState } from 'react';
import { medinfoApi } from '../../api/medinfoApi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const {TextArea} = Input;

const ExaminationForm = () => {
    const navigate = useNavigate();

    type doctorParams = {
        doctor_username: string
    }
    const {doctor_username} = useParams<doctorParams>();

    const [medical_id, setMedicalId] = useState('');
    const [case_id, setCaseId] = useState('');
    const [testresult, setTestresult] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [username, setUsername] = useState('');


    const onFinish = (e) => {
        console.log('finish');
        
        let examination = {
            testresult: testresult ,
            diagnosis: diagnosis,
            treatment: treatment,
        }

        console.log(examination);
        medinfoApi.updateCase(examination, doctor_username, username , medical_id, case_id);
        navigate(`/user/operator/profile/${doctor_username}`);
    };



    return ( 
        <Card className={styles.cover}>

        <Divider orientation="left"style={{fontSize: 40}}>Append Case</Divider> 

        <Form 
            className={styles.case_form}
            onFinish={onFinish}

        >
            <Form.Item>
            <TextArea 
                rows={5}
                placeholder="Username" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}

            />
            </Form.Item>
            <Form.Item>
            <TextArea 
                rows={5}
                placeholder="medical infor id" 
                id="medical_id" 
                value={medical_id} 
                onChange={(e) => setMedicalId(e.target.value)}

            />
            </Form.Item>
            <Form.Item>
                <TextArea 
                    rows={5}
                    placeholder="case id" 
                    id="case_id" 
                    value={case_id} 
                    onChange={(e) => setCaseId(e.target.value)}

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
                    Append Case
                </Button>
            </Form.Item >
        </Form> 
        </Card>
    )
}

export default ExaminationForm;