import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CaseCard from '../components/TableList/CaseCard';
import {Card, Input, Divider, Button} from 'antd';
import styles from '../assets/css/AuthorizationList.module.css'

const SearchByKeyWord = () => {
    const [keyword, setKeyword] = useState<any>();
    const [result, setResult] = useState<any>();

    const handleSearch = async() => {
        await fetch(`http://localhost:8080/medinfo/query_by_keyword/["${keyword}"]`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.response)
            setResult(data.response);
        }
        ).catch((error) => {
            console.log(error);
        });
        console.log(keyword);
    }

    return (
        <Card className={styles.cover}>
            <Divider orientation="left"style={{fontSize: 40}}>Search Case</Divider> 
            {/* <Title>
                Case_ID: medical1
            </Title> */}
        <Input
        placeholder="Search a case"
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
        onClick={handleSearch}
        >
        Shoot it!
        </Button>
        {result && result.map((cases: any) => (
            <CaseCard
                case_id={cases.Case_ID || "medical1"}
                testresult={cases.TestResult || "cancer"}
                diagnosis={cases.Diagnosis || "cancer stage 1"}
                treatment={cases.Treatment || "use medicine "}
            />
        ))}
        </Card>
    )

}

export default SearchByKeyWord;