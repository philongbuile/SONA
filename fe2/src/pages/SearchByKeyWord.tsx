import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MedicalInfoCard from '../components/TableList/MedicalInfoCard';
import {Card, Input, Divider, Button} from 'antd';
import styles from '../assets/css/AuthorizationList.module.css'
import MockSearch from '../api/MockSearch.json'

const SearchByKeyWord = () => {
    const [keyword, setKeyword] = useState<any>();
    const [result, setResult] = useState<any>();

    const handleSearch = async() => {
        await fetch(`http://localhost:8080/medinfo/query_by_keyword/["${keyword}"]`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setResult(data.response[0]);
        }).catch((error) => {
            console.log(error);
        });
        console.log(keyword);
    }

    return (
        <Card className={styles.cover}>
            <Divider orientation="left"style={{fontSize: 40}}>Search Medical Infor</Divider> 
            {/* <Title>
                Case_ID: medical1
            </Title> */}
        <Input
        placeholder="Enter a medical infor"
        style={{ 
            width: 200,
            height: 40,
            borderRadius: 10,
            marginLeft: "100px",
            marginBottom: "20px",
        }}
        onChange={(e) => setKeyword(e.target.value)}
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
        onClick={() => {handleSearch()}}>
        Shoot it! 
        </Button>
        {result && 
            <Link to={"medicalinfo/table/" + result.ID}>
                <MedicalInfoCard medical_id={result.ID} tag={keyword}/>
            </Link>
        }
        </Card>
    )

}

export default SearchByKeyWord;