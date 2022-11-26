import DoctorCard from "../../components/ProfileCard/DoctorCard";
import {Card, Divider, Typography, Input, Button} from 'antd'
import styles from '../../assets/css/AuthorizationList.module.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom";

const UserAuthorizeDoctor = () => {
    const navigate = useNavigate();

    const {username} = useParams<any>();
    const {medical_id} = useParams<any>();
    const [doctor_username, setDoctorUsername] = useState<any>();
    const [doctors, setDoctors] = useState<any>();
    const [result, setResult] = useState<any>();

    const handleSearch = async() => {
        await fetch(`http://128.199.203.189:8080/operator/queryall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const doctype = data.response.filter((item: any) => item.docType == "operator");
            console.log(doctype);
            const doctor = doctype.filter((item: any) => item.Username.includes(doctors));
            setResult(doctor);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    return (
        <Card className={styles.cover}>
        <Divider orientation="left"style={{
            fontSize: 40,
        }}>Let's find a doctor to authorize</Divider> 
        <Input
            style={{ 
                width: 200,
                height: 40,
                borderRadius: 10,
                marginLeft: "100px",
                marginBottom: "20px",
            }}
            onChange={(e) => setDoctors(e.target.value)}
            placeholder="enter your doctor username"
        />
        <Button
            type="primary"
            style={{
                width: 100,
                height: 40,
                borderRadius: 10,
                marginLeft: "10px",
                marginBottom: "20px"
            }}
            onClick={() => handleSearch()}>
            Find Doctor
        </Button>
        <Divider orientation="left"style={{
            fontSize: 40,
        }}>Search Result</Divider>
        <div className={styles.container}>
            {result && result.map((item: any) => (
                <DoctorCard
                    doctor_username={item.Username}
                    role={item.Role}
                />
            ))}
        </div>
        </Card>
    )
}

export default UserAuthorizeDoctor;