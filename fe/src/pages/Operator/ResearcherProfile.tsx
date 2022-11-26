import React, { useEffect, useState } from 'react';
import UserProfileCard from '../../components/ProfileCard/UserProfileCard';
import {Divider, Typography, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import { Button } from '../../components/Button/index2';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

const ResearcherProfile = () => {
  const doctor_username = useParams<any>();
  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div>
        <Divider
          orientation="left"
          style={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            color: '#72c6d5',
          }}
        >
        </Divider>
        <div>
          <UserProfileCard
            fullname= {"Researcher Albert Zweitein" as string}
            username={"albert_funny" as string}
            phone={"12345678" as string}
            gender={"male" as string}
            dob={"1/1/2001" as string}
            address={"19 Berliner Strasse, Gross Gerau" as string}
            avatar={undefined}
          />
          <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
            }}>
            <Button>
                <Link to={"/operator/search/" + doctor_username}>Search Med Info</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearcherProfile;
