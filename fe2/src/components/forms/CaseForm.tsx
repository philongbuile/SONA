import styles from '../../assets/css/CaseForm.module.css';
import { Form, Input } from 'antd'

const CaseForm = () => {
    return ( 
        <Form className={styles.case_form}>
            <Form.Item>
                <Input placeholder="test result"/>
            </Form.Item>

            <Form.Item>
                <Input placeholder="diagnosis"/>
            </Form.Item>

            <Form.Item>
                <Input placeholder="treatment"/>
            </Form.Item>
        </Form>
    )
}

export default CaseForm;