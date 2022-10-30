import { Card, Form, Button } from 'antd';
import React from 'react';
import styles from '../assets/css/GroupCard.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Class } from '../models/Class';
const { Meta } = Card;

const GroupCard: React.FC<Class> = ({ id, className, info, level }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${id}/home`);
  };

  return (
    <Form>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            className={styles.cover}
            style={{
              alignItems: 'center',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          />
        }
      >
        <div className={styles.wrapper}>
          <Meta
            title={className}
            description={info}
            className={styles.content}
            style={{ textAlign: 'center' }}
          />
          <Button
            className={styles.btn}
            style={{ alignItems: 'center' }}
            onClick={() => handleClick()}
          >
            Visit
          </Button>
        </div>
      </Card>
    </Form>
  );
};

export default GroupCard;
