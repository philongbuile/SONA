import listStyles from '../../assets/css/TableItem.module.css'
import tableStyles from '../../assets/css/TableList.module.css'
import {Card, Button } from 'antd'
import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'


interface DoctorCardProps {
  doctor_username: string;
  role: string;
}


const DoctorCard: React.FC<DoctorCardProps> = ({
    doctor_username,
    role,
}) => {
  const {username} = useParams<any>()

  const [result, setResult] = useState<any>();

  const handleAuthorize = async() => {
    await fetch(`http://localhost:8080/patient/authorize_doctor/${username}/${doctor_username}`, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setResult(data);
    }
    ).catch((error) => {
        console.log(error)
    });
  }
  return (

      <div className={tableStyles.table_list}>

        <Card className={listStyles.item}>
          <p className={listStyles.id}> Username: {doctor_username} </p>
          <p className={listStyles.name}>Role: {role}</p>
          <Button className={listStyles.revoke} onClick={() => handleAuthorize()}>Authorize</Button>
        </Card>
      </div>
  )
}

export default DoctorCard;