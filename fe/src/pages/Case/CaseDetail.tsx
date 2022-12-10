import Navbar from "../../components/Navbar";
import CaseCard from "../../components/ProfileCard/CaseCard";
import styles from '../../assets/css/AuthorizationList.module.css'
import {Card, Divider, Typography} from 'antd'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
const { Title } = Typography;

const BASE_API = process.env.URL || 'localhost:8080';

const CaseDetail = () => {
    type medicalParams = {
        medical_id: string;
    }
    type caseParams = {
        case_id: string;
    }
    const {medical_id} = useParams<medicalParams>()
    const {case_id} = useParams<caseParams>()
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        fetch(`http://${BASE_API}/medinfo/patient_query_medicalinfo/${medical_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                const temp = data.response.Cases.filter((item: any) => item.Case_ID === case_id);
                setResult(temp);
                setError('');

            }).catch((error) => {
                setLoading(false);
                console.log(error);
                setError('Error');
            });
    }, [])


    return (

        <Card className={styles.cover}>
            <Divider orientation="left"style={{fontSize: 40}}>Your Case with Examinations {case_id}</Divider> 
            {/* <Title>
                Case_ID: medical1
            </Title> */}
            {loading && <div 
                    className="fixed top-0 right-0 bg-black/50 w-screen h-screen flex justify-center items-center"
                    style={{ zIndex: 1000,
                    fontSize: "36px", color: "white"}}>loading...</div>}
            {result && result.map((item: any) => (
               item.Examinations.map((exam: any) => (
                <CaseCard 
                testresult= {exam.TestResult}
                diagnosis= {exam.Diagnosis}
                treatment={exam.Treatment}   
                />       
               )))
            )}
        </Card>
    );
}

export default CaseDetail;