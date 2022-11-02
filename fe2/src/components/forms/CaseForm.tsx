import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input, Button, FormInstance} from 'antd'
import { Case } from '../../models/MedicalInfo';
import { medinfoApi } from '../../api/medinfoApi';
import { useState } from 'react';

import { Divider, Card} from 'antd'

const {TextArea} = Input;

const CaseForm = () => {

    const [testresult, setTestresult] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');


    const onFinish = (e) => {
        console.log('finish');
        
        let examination = {
                    testresult: testresult ,
                    diagnosis: diagnosis,
                    treatment: treatment,
                }
        console.log(examination);
        medinfoApi.addCase(examination, 'Doctor1', 'peter123', '58ac5bd0-5670-11ed-81f7-057484e78b65');
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