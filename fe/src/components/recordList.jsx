import './RecordList.css';
import { Row, Col} from 'antd';

const Record = () => {
    return (
        <div className="record_list">
            <div className="record_list_header">
                <h1>Medical Infor </h1>
            </div>
            <div className="record_list_content">
                <Row className="record_list_content_item">
                    <Col xs={24} xl={8}>
                        Case ID: 1
                    </Col>
                    <Col xs={24} xl={8}>
                        Date: 2021-01-01
                    </Col>
                    <Col xs={24} xl={8}>
                        Status: Pending
                    </Col>
                </Row>
                <Row className="record_list_content_item">
                    <Col xs={24} xl={8}>
                        Case ID: 2
                    </Col>
                    <Col xs={24} xl={8}>
                        Date: 2021-01-02
                    </Col>
                    <Col xs={24} xl={8}>
                        Status: Pending
                    </Col>
                </Row>
                <Row className="record_list_content_item">
                    <Col xs={24} xl={8}>
                        Case ID: 3
                    </Col>
                    <Col xs={24} xl={8}>
                        Date: 2021-01-02
                    </Col>
                    <Col xs={24} xl={8}>
                        Status: Pending
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default Record;