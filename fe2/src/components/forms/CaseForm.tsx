import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input, Button, FormInstance} from 'antd'
import { Case } from '../../models/MedicalInfo';
import { medinfoApi } from '../../api/medinfoApi';
import { useState } from 'react';


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
        medinfoApi.addCase(examination, 'Doctor1', 'camtu123', 'medical1');
    };


    const onChange = (e) => {
        
    };

    return ( 
        <Form 
            className={styles.case_form}
            onFinish={onFinish}

        >
            <Form.Item>
                <Input 
                    placeholder="test result" 
                    id="test-result" 
                    value={testresult} 
                    onChange={(e) => setTestresult(e.target.value)}

                />
            </Form.Item>

            <Form.Item>
                <Input 
                    placeholder="diagnosis" 
                    id='diagnosis' 
                    value={diagnosis} 
                    onChange={(e) => setDiagnosis(e.target.value)}

                />
            </Form.Item>

            <Form.Item>
                <Input 
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CaseForm;