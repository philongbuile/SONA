import DoctorCard from "../components/TableList/DoctorCard";
import {Card, Divider, Typography, Input} from 'antd'
import styles from '../assets/css/AuthorizationList.module.css'
import {useState, useEffect} from 'react'

const FindDoctor = () => {
    return (
        <Card className={styles.cover}>
        <Divider orientation="left"style={{
            fontSize: 40,
        }}>Let's find a doctor to authorize</Divider> 
        <Input
            placeholder="Search doctor"
            style={{ 
                width: 200,
                height: 40,
                borderRadius: 10,
                marginLeft: "100px",
                marginBottom: "20px",
            }}
        />
        <DoctorCard 
            username="doctor1"
            role="doctor"
        />
        <DoctorCard
            username="doctor2"
            role="doctor"
        />
        </Card>
    )
}

export default FindDoctor;