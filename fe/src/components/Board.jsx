import './Board.css';
import {Card, Row, Col} from 'antd';
import {useParams} from 'react-router-dom';
import {PersonalInforFetch, MedicalInforFetch} from '../api/userApi';

const Board = () => {
    const {username} = useParams();
    const {medicalInfoID} = useParams();
    const {data: personalData, isPending, error} = PersonalInforFetch(username);
    const {data: medicalData} = MedicalInforFetch(medicalInfoID);

    return (
        <div className="board">
        <Card bordered={false}>
            <div className="board_header">
                <h1>Medical Examination</h1>
            </div>
                <div className="board_content_title">
                    <div>Information</div>
                <div className="board_content_item">
                    <Row className="board_list_content_item">
                        <Col xs={24} xl={8}>
                            Medical Infor ID: medical1
                        </Col>
                        <Col xs={24} xl={8}>
                            Case ID: case1
                        </Col>
                        <Col xs={24} xl={8}>
                            DocType: Patient
                        </Col>
                    </Row>
                    <br></br>
                    <div>Test Result</div>
                    <Row className="board_list_content_item">
                        <Col xs={24} xl={8}>
                            Test Result: Success
                        </Col>
                    </Row>
                    <br></br>
                    <div>Diagnosis</div>
                    <Row className="board_list_content_item">
                        <Col xs={24} xl={8}>
                            Diagnosis: Allergic Rhinitis
                        </Col>
                    </Row>
                    <br></br>
                    <div>Treatment</div>
                    <Row className="board_list_content_item">
                        <Col xs={24} xl={8}>
                            Treatment: Use medicine
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
        </div>
    );
};

export default Board;