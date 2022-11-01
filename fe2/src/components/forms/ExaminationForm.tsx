import styles from '../../assets/css/CaseForm.module.css';
import { Divider, Card, Form, Input } from 'antd'

const {TextArea} = Input;

const ExaminationForm = () => {
    return ( 
        <Card className={styles.cover}>

        <Divider orientation="left"style={{fontSize: 40}}>Create Case</Divider> 

        <Form className={styles.case_form}>
            <Form.Item>
                <TextArea rows={5} placeholder="test result"/>
            </Form.Item>

            <Form.Item>
                <TextArea rows={5} placeholder="diagnosis"/>
            </Form.Item>

            <Form.Item>
                <TextArea rows={5} placeholder="treatment"/>
            </Form.Item>
        </Form>
        </Card>
    )
}

export default ExaminationForm;