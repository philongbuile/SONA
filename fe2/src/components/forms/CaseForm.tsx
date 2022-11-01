import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input } from 'antd'

const {TextArea} = Input;

const CaseForm = () => {
    return ( 
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
    )
}

export default CaseForm;