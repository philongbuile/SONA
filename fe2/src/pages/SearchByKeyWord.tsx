import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MedicalInfoCard from '../components/TableList/MedicalInfoCard';
import {Card, Input, Divider, Button} from 'antd';
import styles from '../assets/css/AuthorizationList.module.css'
import MockSearch from '../api/MockSearch.json'

const SearchByKeyword = () => {
    const [keyword, setKeyword] = useState<any>();
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    

    function getKWArrayJson(keywords: string) {

        // remove all whitespace
        const kw_array = keywords.split(',');

        // split the keywords
        return JSON.stringify(kw_array.map((item) => item.trim()));
    }


    const handleSearch = async() => {
        setLoading(true);
        const kw = getKWArrayJson(keyword);
        console.log(kw);
        await fetch(`http://localhost:8080/medinfo/query_by_keyword/${kw}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setResult(data.response);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
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
                    {loading && <div 
        className="fixed top-0 right-0 bg-black/50 w-screen h-screen flex justify-center items-center"
        style={{ zIndex: 1000,
        fontSize: "36px", color: "white"}}>loading...</div>}
        Shoot it! 
        </Button>
        {result && result.map((meditem) => 
            <Link to={"medicalinfo/table/" + meditem.ID}>
                <MedicalInfoCard medical_id={meditem.ID} tag={keyword}/>
            </Link>
        )
            
        }
        </Card>
    )

}

export default SearchByKeyword;