import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Image, Typography, Space } from 'antd';
import styles from '../../assets/css/UserProfile.module.css';
const { Title, Text } = Typography;

interface UserCardProps {
  fullname: string;
  username: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  avatar: React.ReactNode;
}

const UserProfileCard: React.FC<UserCardProps> = ({
  fullname,
  username,
  gender,
  phone,
  dob,
  address,
}) => {
  return (
    <div className={styles.content}>
      <Image
        width={250}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        style={{ borderRadius: '50%' }}
      />

      <div className={styles.info}>
        <Title level={3}>@{username}</Title>
        <p style={{ fontSize: '20px', color: '#49484a' }}>{fullname}</p>
        <Space direction="vertical">
          <Text strong>Phone: {phone}</Text>
          <Text strong>DoB: {dob}</Text>
          <Text strong>Gender: {gender}</Text>
          <Text strong>Address: {address}</Text>
        </Space>
      </div>
    </div>
  );
};

export default UserProfileCard;
